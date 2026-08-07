import { describe, expect, it } from "vitest";
import { cartLinesDiscountsGenerateRun } from "./cart_lines_discounts_generate_run";
import { DiscountClass, ProductDiscountSelectionStrategy } from "../generated/api";

function line({ id, qty = 1, bundleId, bundleType, slot }) {
  return {
    id,
    quantity: qty,
    bundleId: bundleId ? { value: bundleId } : null,
    bundleType: bundleType ? { value: bundleType } : null,
    bundleSlot: slot ? { value: slot } : null,
  };
}

function input(lines, metafield) {
  return {
    cart: { lines },
    discount: {
      discountClasses: [DiscountClass.Product],
      metafield: metafield ? { jsonValue: metafield } : null,
    },
  };
}

describe("cartLinesDiscountsGenerateRun", () => {
  it("returns nothing without PRODUCT discount class", () => {
    const result = cartLinesDiscountsGenerateRun({
      cart: { lines: [line({ id: "gid://shopify/CartLine/1", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Wallet" })] },
      discount: { discountClasses: [], metafield: null },
    });
    expect(result).toEqual({ operations: [] });
  });

  it("discounts a complete Everyday Carry set", () => {
    const result = cartLinesDiscountsGenerateRun(
      input([
        line({ id: "gid://shopify/CartLine/1", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Wallet" }),
        line({ id: "gid://shopify/CartLine/2", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Lanyard" }),
        line({ id: "gid://shopify/CartLine/3", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Chapstick" }),
      ]),
    );

    expect(result.operations).toHaveLength(1);
    const op = result.operations[0].productDiscountsAdd;
    expect(op.selectionStrategy).toBe(ProductDiscountSelectionStrategy.All);
    expect(op.candidates).toHaveLength(1);
    expect(op.candidates[0].message).toBe("Everyday Carry Set 20% off");
    expect(op.candidates[0].value.percentage.value).toBe(20);
    expect(op.candidates[0].targets).toHaveLength(3);
  });

  it("skips incomplete Everyday Carry sets", () => {
    const result = cartLinesDiscountsGenerateRun(
      input([
        line({ id: "gid://shopify/CartLine/1", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Wallet" }),
        line({ id: "gid://shopify/CartLine/2", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Lanyard" }),
      ]),
    );
    expect(result).toEqual({ operations: [] });
  });

  it("ignores unstamped lines even with 3 eligible-looking items", () => {
    const result = cartLinesDiscountsGenerateRun(
      input([
        line({ id: "gid://shopify/CartLine/1", slot: "Wallet" }),
        line({ id: "gid://shopify/CartLine/2", slot: "Lanyard" }),
        line({ id: "gid://shopify/CartLine/3", slot: "Chapstick" }),
      ]),
    );
    expect(result).toEqual({ operations: [] });
  });

  it("discounts a complete Market Tote group (3 lines)", () => {
    const result = cartLinesDiscountsGenerateRun(
      input([
        line({ id: "gid://shopify/CartLine/1", bundleId: "tote_1", bundleType: "market_tote", slot: "Tote 1" }),
        line({ id: "gid://shopify/CartLine/2", bundleId: "tote_1", bundleType: "market_tote", slot: "Tote 2" }),
        line({ id: "gid://shopify/CartLine/3", bundleId: "tote_1", bundleType: "market_tote", slot: "Tote 3" }),
      ]),
    );
    expect(result.operations[0].productDiscountsAdd.candidates[0].message).toBe(
      "Tote Bundle 20% off",
    );
    expect(result.operations[0].productDiscountsAdd.candidates[0].targets).toEqual([
      { cartLine: { id: "gid://shopify/CartLine/1", quantity: 1 } },
      { cartLine: { id: "gid://shopify/CartLine/2", quantity: 1 } },
      { cartLine: { id: "gid://shopify/CartLine/3", quantity: 1 } },
    ]);
  });

  it("discounts floor(qty/3)*3 units for multi-qty tote lines", () => {
    const result = cartLinesDiscountsGenerateRun(
      input([
        line({ id: "gid://shopify/CartLine/1", qty: 5, bundleId: "tote_1", bundleType: "market_tote", slot: "Tote 1" }),
      ]),
    );
    expect(result.operations[0].productDiscountsAdd.candidates[0].targets).toEqual([
      { cartLine: { id: "gid://shopify/CartLine/1", quantity: 3 } },
    ]);
  });

  it("supports two independent complete EDC bundles", () => {
    const result = cartLinesDiscountsGenerateRun(
      input([
        line({ id: "gid://shopify/CartLine/1", bundleId: "tri_a", bundleType: "everyday_carry", slot: "Wallet" }),
        line({ id: "gid://shopify/CartLine/2", bundleId: "tri_a", bundleType: "everyday_carry", slot: "Lanyard" }),
        line({ id: "gid://shopify/CartLine/3", bundleId: "tri_a", bundleType: "everyday_carry", slot: "Chapstick" }),
        line({ id: "gid://shopify/CartLine/4", bundleId: "tri_b", bundleType: "everyday_carry", slot: "Wallet" }),
        line({ id: "gid://shopify/CartLine/5", bundleId: "tri_b", bundleType: "everyday_carry", slot: "Lanyard" }),
        line({ id: "gid://shopify/CartLine/6", bundleId: "tri_b", bundleType: "everyday_carry", slot: "Chapstick" }),
      ]),
    );
    expect(result.operations[0].productDiscountsAdd.candidates).toHaveLength(2);
  });

  it("reads percent from metafield config", () => {
    const result = cartLinesDiscountsGenerateRun(
      input(
        [
          line({ id: "gid://shopify/CartLine/1", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Wallet" }),
          line({ id: "gid://shopify/CartLine/2", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Lanyard" }),
          line({ id: "gid://shopify/CartLine/3", bundleId: "tri_1", bundleType: "everyday_carry", slot: "Chapstick" }),
        ],
        { percent: 15, edcMessage: "EDC 15%" },
      ),
    );
    expect(result.operations[0].productDiscountsAdd.candidates[0].value.percentage.value).toBe(15);
    expect(result.operations[0].productDiscountsAdd.candidates[0].message).toBe("EDC 15%");
  });
});
