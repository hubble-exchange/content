import { unScale } from './unscale'

export interface FormattedAmount {
  base: bigint
  display: string
  formatted: string
}

/**
 * un-scales unit with give decimals and returns
 * @returns base: original value, display: unScaled value with 0-3 decimals with comma, formatted: unScaled value with all decimals
 * @example
 * getFormattedAmount('12345678900223', 6, 3) // { base: 12345678900223n, display: '12,345,678.9', formatted: '12345678.900223' }
 */
export function formatAmount(value: bigint | string, decimals: number, displayDecimals: 0 | 1 | 2 | 3 = 3) {
  const valueUnScaled = unScale(value, decimals)
  return {
    base: BigInt(value),
    display: parseFloat(valueUnScaled.slice(0, valueUnScaled.indexOf('.') + displayDecimals + 1)).toLocaleString(),
    formatted: valueUnScaled,
  }
}
