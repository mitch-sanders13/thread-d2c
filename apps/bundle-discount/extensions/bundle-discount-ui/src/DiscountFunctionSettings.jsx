/**
 * Discount Function settings — shown on the discount create/details page
 * in Shopify admin when merchants pick this app discount.
 *
 * Saves JSON to the $app / function-configuration metafield that the
 * Discount Function already reads.
 */
/** @jsxImportSource preact */
import "@shopify/ui-extensions/preact";
import { render } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";

const DEFAULTS = {
  percent: 20,
  toteSize: 3,
  edcSlots: ["Wallet", "Lanyard", "Chapstick"],
  edcMessage: "Everyday Carry Set 20% off",
  toteMessage: "Tote Bundle 20% off",
};

export default async () => {
  render(<App />, document.body);
};

function App() {
  const {
    applyExtensionMetafieldChange,
    i18n,
    config,
    setConfig,
    resetForm,
    loading,
  } = useExtensionData();

  const [error, setError] = useState();
  const { discounts } = shopify;
  const discountClasses = discounts?.discountClasses?.value ?? [];

  // Ensure PRODUCT class is enabled so the Function can discount lines.
  useEffect(() => {
    if (!discounts?.updateDiscountClasses) return;
    if (discountClasses.includes("product")) return;
    discounts.updateDiscountClasses(["product"]).then((result) => {
      if (!result?.success) setError(i18n.translate("error"));
    });
  }, [discountClasses, discounts, i18n]);

  if (loading) {
    return <s-text>{i18n.translate("loading")}</s-text>;
  }

  return (
    <s-function-settings
      onSubmit={(event) => {
        event.waitUntil?.(
          applyExtensionMetafieldChange().catch(() => {
            setError(i18n.translate("error"));
          }),
        );
      }}
      onReset={resetForm}
    >
      <s-heading>{i18n.translate("title")}</s-heading>
      <s-section>
        <s-stack gap="base">
          {error ? <s-banner tone="critical">{error}</s-banner> : null}
          <s-banner tone="info">{i18n.translate("help")}</s-banner>

          <s-number-field
            label={i18n.translate("percentLabel")}
            name="percent"
            value={String(config.percent)}
            min={1}
            max={100}
            suffix="%"
            onChange={(event) =>
              setConfig((prev) => ({
                ...prev,
                percent: Number(event.currentTarget.value) || 20,
              }))
            }
          />

          <s-number-field
            label={i18n.translate("toteSizeLabel")}
            name="toteSize"
            value={String(config.toteSize)}
            min={2}
            max={20}
            onChange={(event) =>
              setConfig((prev) => ({
                ...prev,
                toteSize: Number(event.currentTarget.value) || 3,
              }))
            }
          />

          <s-text-field
            label={i18n.translate("edcMessageLabel")}
            name="edcMessage"
            value={config.edcMessage}
            onChange={(event) =>
              setConfig((prev) => ({
                ...prev,
                edcMessage: event.currentTarget.value,
              }))
            }
          />

          <s-text-field
            label={i18n.translate("toteMessageLabel")}
            name="toteMessage"
            value={config.toteMessage}
            onChange={(event) =>
              setConfig((prev) => ({
                ...prev,
                toteMessage: event.currentTarget.value,
              }))
            }
          />
        </s-stack>
      </s-section>
    </s-function-settings>
  );
}

function parseMetafield(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return {
      percent: Number(parsed.percent ?? DEFAULTS.percent),
      toteSize: Number(parsed.toteSize ?? DEFAULTS.toteSize),
      edcSlots: Array.isArray(parsed.edcSlots) ? parsed.edcSlots : DEFAULTS.edcSlots,
      edcMessage: parsed.edcMessage || DEFAULTS.edcMessage,
      toteMessage: parsed.toteMessage || DEFAULTS.toteMessage,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

function useExtensionData() {
  const { applyMetafieldChange, i18n, data } = shopify;

  const metafieldConfig = useMemo(
    () =>
      parseMetafield(
        data?.metafields?.find((m) => m.key === "function-configuration")?.value,
      ),
    [data?.metafields],
  );

  const [config, setConfig] = useState(metafieldConfig);
  const [loading] = useState(false);

  useEffect(() => {
    setConfig(metafieldConfig);
  }, [metafieldConfig]);

  async function applyExtensionMetafieldChange() {
    await applyMetafieldChange({
      type: "updateMetafield",
      namespace: "$app",
      key: "function-configuration",
      value: JSON.stringify({
        percent: config.percent,
        toteSize: config.toteSize,
        edcSlots: config.edcSlots,
        edcMessage: config.edcMessage,
        toteMessage: config.toteMessage,
      }),
      valueType: "json",
    });
  }

  const resetForm = () => setConfig(metafieldConfig);

  return {
    applyExtensionMetafieldChange,
    i18n,
    config,
    setConfig,
    resetForm,
    loading,
  };
}
