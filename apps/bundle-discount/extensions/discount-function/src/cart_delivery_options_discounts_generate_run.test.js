import { describe, expect, it } from "vitest";
import { cartDeliveryOptionsDiscountsGenerateRun } from "./cart_delivery_options_discounts_generate_run";

describe("cartDeliveryOptionsDiscountsGenerateRun", () => {
  it("never applies shipping discounts", () => {
    expect(
      cartDeliveryOptionsDiscountsGenerateRun({
        discount: { discountClasses: ["PRODUCT", "SHIPPING"] },
      }),
    ).toEqual({ operations: [] });
  });
});
