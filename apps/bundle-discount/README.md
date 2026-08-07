# Thread Bundle Discount Function

Applies **20% off** at checkout only to cart lines stamped by the theme bundlers:

| Bundle | Required stamps | Complete when |
|--------|-----------------|---------------|
| Everyday Carry / FBT | `_bundle_id`, `_bundle_type: everyday_carry`, `Bundle Slot` ∈ Wallet / Lanyard / Chapstick | All three slots present |
| Market Tote | `_bundle_id`, `_bundle_type: market_tote` | Total qty ≥ 3 (extras beyond multiples of 3 stay full price) |

No public discount code. Incomplete or unstamped carts get nothing.

## Deploy (Partner app)

Shopify CLI for this app is installed locally as `@shopify/cli` **4.6.1** (use `npx` / npm scripts from this folder). Your global Homebrew CLI may still be older — prefer these commands.

### 1. Log in to Partner / Dev Dashboard (interactive)

```bash
cd apps/bundle-discount
npm run login
```

Complete the browser prompt (Partner account that owns Thread).

### 2. Create or link the app

```bash
npm run link
```

- Choose your Partner org
- **Create a new app** named `Thread Bundle Discount` (or link an existing one)
- This writes `client_id` into `shopify.app.toml`

### 3. Deploy the Discount Function

```bash
npm run deploy
```

Confirm releasing the new app version when prompted.

### 4. Install the app on the Thread store

After deploy, open the install URL the CLI prints (or Dev Dashboard → app → Install on store), and install on `thread-llc` / your production store.

### 5. Create the Automatic discount in admin

1. Shopify admin (`thread-llc`) → **Discounts → Create discount**
2. You should now see **Thread Bundle Discount** (app discount)
3. Create an **Automatic** discount, leave settings at 20%, save

If it still does not appear, hard-refresh admin and confirm the app shows as installed under **Settings → Apps**.

### 6. Cleanup

- Keep theme discount code fields **blank**
- Deactivate leftover `TRIFECTA*` / `TOTE*` codes and any native automatic bundle discounts

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
