/**
 * Divides a number by a given exponent of base 10 (10exponent), and un-scales it into a string representation of the number.
 * @returns A string representation of the number
 * @example
 * unScale(112000000000000000000n, 18) // '112'
 * unScale('112000000000000000000', 18) // '112'
 */
export function unScale(value: bigint | string, decimals: number) {
  let display = value.toString()

  const negative = display.startsWith('-')
  if (negative)
    display = display.slice(1)

  display = display.padStart(decimals, '0')

  const integer = display.slice(0, display.length - decimals)
  let fraction = display.slice(display.length - decimals)
  fraction = fraction.replace(/(0+)$/, '')

  return `${negative ? '-' : ''}${integer || '0'}${fraction ? `.${fraction}` : ''}`
}
