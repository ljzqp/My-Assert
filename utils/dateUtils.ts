
export const calculateDaysUsed = (purchaseDate: string): number => {
  const purchase = new Date(purchaseDate);
  const now = new Date();
  
  // To avoid issues with timezones and time of day, we work with UTC dates
  const start = Date.UTC(purchase.getFullYear(), purchase.getMonth(), purchase.getDate());
  const end = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  if (start > end) return 0;

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((end - start) / millisecondsPerDay) + 1; // Inclusive of the purchase day
};
