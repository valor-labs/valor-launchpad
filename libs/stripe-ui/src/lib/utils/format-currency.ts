/**
 * format amount to currency
 * eg: 1000 -> $10.00
 * @param amount int
 * @param currency usd/eur/...
 */
export function formatCurrency(amount: number, currency: string) {
  const _amount = amount ?? 0;
  const price = +(_amount / 100).toFixed(2);
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(price);
}
