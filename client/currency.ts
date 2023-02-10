export const formatCurrency = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format,
} as const;
