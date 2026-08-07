# Thread Bundle Discount Function

Applies **20% off** at checkout only to cart lines stamped by the theme bundlers:

| Bundle | Required stamps | Complete when |
|--------|-----------------|---------------|
| Everyday Carry / FBT | `_bundle_id`, `_bundle_type: everyday_carry`, `Bundle Slot` ∈ Wallet / Lanyard / Chapstick | All three slots present |
| Market Tote | `_bundle_id`, `_bundle_type: market_tote` | Total qty ≥ 3 (extras beyond multiples of 3 stay full price) |

No public discount code. Incomplete or unstamped carts get nothing.

## Deploy (Partner app)

1. From this folder, link a Partner app (needs `write_discounts`):

```bash
cd apps/bundle-discount
npm install
shopify app config link
shopify app deploy
```

2. In Shopify admin → **Discounts → Create discount → App discount** (or Automatic discount powered by this app):
   - Select **Thread Bundle Discount** / `bundle-discount`
   - Discount classes: **Product**
   - Combinations: usually off for other product discounts

3. Optional metafield config on the discount (`$app` / `function-configuration` JSON):

```json
{
  "percent": 20,
  "edcSlots": ["Wallet", "Lanyard", "Chapstick"],
  "toteSize": 3,
  "edcMessage": "Everyday Carry Set 20% off",
  "toteMessage": "Tote Bundle 20% off"
}
```

4. Keep theme discount code fields **blank** (already the case on `main`) so `/discount/CODE` is never called.

5. Deactivate any leftover `TRIFECTA*` / `TOTE*` codes and native automatic bundle discounts so they don’t double-stack.

## Local test

```bash
cd apps/bundle-discount/extensions/discount-function
npm install
npm test
```

## Theme contract

The Liquid/JS bundlers must stamp:

- `_bundle_id` — unique per set (`tri_…` / `tote_…`)
- `_bundle_type` — `everyday_carry` or `market_tote`
- `Bundle Slot` — `Wallet` | `Lanyard` | `Chapstick` (EDC) or `Tote N` (totes)

Line properties are forgeable via the Ajax Cart API; the Function still requires a complete stamped set. Collection-level checks can be added later via `inAnyCollection` if needed.
