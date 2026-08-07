/**
 * Everyday Carry + Market Tote Discount Function
 *
 * Only discounts cart lines stamped by the theme bundlers:
 *   - _bundle_id (required)
 *   - _bundle_type: everyday_carry | market_tote
 *   - Bundle Slot: Wallet | Lanyard | Chapstick (EDC) or Tote N (totes)
 *
 * Incomplete groups (missing a slot / fewer than 3 totes) get nothing.
 * Optional config metafield ($app / function-configuration):
 *   { percent, edcSlots, toteSize, edcMessage, toteMessage }
 */
import {
  DiscountClass,
  ProductDiscountSelectionStrategy,
} from "../generated/api";

const DEFAULT_CONFIG = {
  percent: 20,
  edcSlots: ["Wallet", "Lanyard", "Chapstick"],
  toteSize: 3,
  edcMessage: "Everyday Carry Set 20% off",
  toteMessage: "Tote Bundle 20% off",
};

function readConfig(input) {
  const raw = input?.discount?.metafield?.jsonValue;
  if (!raw || typeof raw !== "object") return { ...DEFAULT_CONFIG };
  return {
    percent:
      typeof raw.percent === "number" && raw.percent > 0
        ? raw.percent
        : DEFAULT_CONFIG.percent,
    edcSlots: Array.isArray(raw.edcSlots) && raw.edcSlots.length
      ? raw.edcSlots.map(String)
      : DEFAULT_CONFIG.edcSlots,
    toteSize:
      typeof raw.toteSize === "number" && raw.toteSize > 0
        ? Math.floor(raw.toteSize)
        : DEFAULT_CONFIG.toteSize,
    edcMessage:
      typeof raw.edcMessage === "string" && raw.edcMessage
        ? raw.edcMessage
        : DEFAULT_CONFIG.edcMessage,
    toteMessage:
      typeof raw.toteMessage === "string" && raw.toteMessage
        ? raw.toteMessage
        : DEFAULT_CONFIG.toteMessage,
  };
}

function attrValue(attr) {
  return attr && typeof attr.value === "string" ? attr.value : "";
}

function detectType(bundleType, slots) {
  if (bundleType === "market_tote") return "market_tote";
  if (bundleType === "everyday_carry") return "everyday_carry";
  // Legacy carts: infer from Bundle Slot labels when type was missing.
  const edcLike = ["Wallet", "Lanyard", "Chapstick"];
  if (slots.some((s) => edcLike.includes(s))) return "everyday_carry";
  if (slots.some((s) => /^Tote\s+\d+/i.test(s))) return "market_tote";
  return "";
}

function groupLines(lines) {
  const groups = new Map();
  for (const line of lines) {
    const bundleId = attrValue(line.bundleId);
    if (!bundleId) continue;
    if (!groups.has(bundleId)) {
      groups.set(bundleId, {
        bundleId,
        lines: [],
        slots: [],
        types: new Set(),
      });
    }
    const g = groups.get(bundleId);
    g.lines.push(line);
    const slot = attrValue(line.bundleSlot);
    if (slot) g.slots.push(slot);
    const t = attrValue(line.bundleType);
    if (t) g.types.add(t);
  }
  return groups;
}

function edcTargets(group, edcSlots) {
  const present = new Set(group.slots);
  for (const required of edcSlots) {
    if (!present.has(required)) return [];
  }
  // One complete set → discount every line in the stamped group.
  return group.lines.map((line) => ({
    cartLine: { id: line.id },
  }));
}

function toteTargets(group, toteSize) {
  // Prefer explicit per-line qty; sum across the group (multi-SKU or multi-qty).
  let totalQty = 0;
  for (const line of group.lines) {
    totalQty += typeof line.quantity === "number" ? line.quantity : 0;
  }
  const completeSets = Math.floor(totalQty / toteSize);
  if (completeSets < 1) return [];

  let remaining = completeSets * toteSize;
  const targets = [];
  for (const line of group.lines) {
    if (remaining <= 0) break;
    const qty = typeof line.quantity === "number" ? line.quantity : 0;
    const take = Math.min(qty, remaining);
    if (take > 0) {
      targets.push({
        cartLine: {
          id: line.id,
          quantity: take,
        },
      });
      remaining -= take;
    }
  }
  return targets;
}

export function cartLinesDiscountsGenerateRun(input) {
  const hasProductDiscountClass = (input.discount?.discountClasses || []).includes(
    DiscountClass.Product,
  );
  if (!hasProductDiscountClass) {
    return { operations: [] };
  }

  const config = readConfig(input);
  const groups = groupLines(input.cart?.lines || []);
  const candidates = [];

  for (const group of groups.values()) {
    const typeHint = group.types.size === 1 ? [...group.types][0] : "";
    const kind = detectType(typeHint, group.slots);

    let targets = [];
    let message = "";
    if (kind === "everyday_carry") {
      targets = edcTargets(group, config.edcSlots);
      message = config.edcMessage;
    } else if (kind === "market_tote") {
      targets = toteTargets(group, config.toteSize);
      message = config.toteMessage;
    }

    if (!targets.length) continue;

    candidates.push({
      message,
      targets,
      value: {
        percentage: {
          value: config.percent,
        },
      },
    });
  }

  if (!candidates.length) {
    return { operations: [] };
  }

  return {
    operations: [
      {
        productDiscountsAdd: {
          candidates,
          selectionStrategy: ProductDiscountSelectionStrategy.All,
        },
      },
    ],
  };
}
