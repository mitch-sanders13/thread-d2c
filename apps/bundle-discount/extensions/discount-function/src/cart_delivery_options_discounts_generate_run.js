/**
 * No shipping discounts for Thread bundles — keep the delivery target silent.
 */
export function cartDeliveryOptionsDiscountsGenerateRun(_input) {
  return { operations: [] };
}
