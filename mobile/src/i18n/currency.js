import { RATES } from './translations'

/* Service prices are written as Rupiah strings in the data file. */
export function parseIDR(value) {
  const digits = String(value).replace(/[^\d]/g, '')
  return Number(digits || 0)
}

export function fromIDR(amount, currency) {
  if (currency === 'USD') return amount / RATES.usdToIdr
  if (currency === 'CNY') return amount / RATES.cnyToIdr
  return amount
}

export function fromUSD(amount, currency) {
  if (currency === 'IDR') return amount * RATES.usdToIdr
  if (currency === 'CNY') return amount * RATES.usdToCny
  return amount
}

const fixed = (value, digits) =>
  new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)

export function money(value, currency) {
  if (currency === 'IDR') {
    return `Rp ${new Intl.NumberFormat('id-ID').format(Math.round(value))}`
  }
  if (currency === 'USD') return `$${fixed(value, 2)}`
  return `¥${fixed(value, 2)}`
}
