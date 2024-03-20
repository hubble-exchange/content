import { BigNumber as BN } from '@ethersproject/bignumber'
import { commify, formatUnits, parseUnits } from '@ethersproject/units'
import { removeExtraZeros, shortenDecimals } from './formatter'

export const bnPow = (decimal = 6, base = 10): string => {
  return BN.from(base).pow(decimal).toString()
}

export const bnToFloat = (num: BigNumberish, decimals = 6) => {
  return parseFloat(formatUnits(num.toString(), decimals))
}

/**
 * format value with give decimals and get original value with unScaled values with 3 decimals with comma and all decimals
 * @param value - value to format
 * @param decimals - number of decimals to format (default: 6) (optional)
 * @param displayDecimals - number of decimals to display (default: 3) (optional)
 * @returns formatted value as object with base, formatted and formattedFull values as string
 */
export const getFormattedAmount = (value: number | string, decimals = 6, displayDecimals = 3): AmountFormat => {
  const valueFormatted = formatUnits(value, decimals)
  return {
    base: `${value}`,
    formatted: shortenDecimals(commify(valueFormatted), displayDecimals, true),
    formattedFull: removeExtraZeros(valueFormatted),
  }
}

export interface AmountFormat {
  base: string
  formatted: string
  formattedFull: string
}

export type BigNumberish = BN | bigint | string | number

/**
 * Scale the given number to the given decimals (e.g. 1 with 6 decimal -> 1000000)
 * @param amount The number to scale
 * @param decimals The number of decimals to scale to
 * @returns The scaled number (e.g. 1 with 6 decimal -> 1000000)
 */
const scale = (amount: string | number | bigint, decimals: BigNumberish = 6): BN => {
  return parseUnits(amount.toString(), decimals)
}

/**
 * UnScale the given base number to the given decimals (e.g. 1000000000000000000000012 with 18 decimal -> 1000000)
 * @param amount The number to un scale
 * @param decimals The number of decimals to un scale to
 * @returns The unscaled base number in string (e.g. 1000000000000000000000012 with 18 decimal -> 1000000)
 */
export const unScaleToBase = (amount: BigNumberish, decimals: BigNumberish = 6): string => shortenDecimals(formatUnits(amount, decimals), 0)

/**
 * calculate total price from units using price per unit (e.g. units = 2e6, unitPrice = 1e5, unitDecimals = 6, priceDecimals = 6 => 0.2)
 * @param units - The units to convert e.g. 2e6
 * @param unitPrice - The unit price e.g. 1e5
 * @param unitDecimals - The unit decimals e.g. 6
 * @param priceDecimals - The price decimals e.g. 6
 * @param doAbs - do Math.abs on value of units?
 * @returns the total price for the given units using given unit price e.g. 0.2
 */
export const calcTotalPrice = (
  units: BigNumberish,
  unitPrice: BigNumberish,
  unitDecimals = 6,
  priceDecimals = 6,
  doAbs = false,
): AmountFormat => {
  if (doAbs)
    units = BN.from(units).abs()
  return getFormattedAmount(
    scale(unitPrice.toString(), priceDecimals)
      .mul(scale(units.toString(), priceDecimals))
      .div(bnPow(priceDecimals + priceDecimals + unitDecimals))
      .toString(),
    priceDecimals,
  )
}

/**
 * calculate unit price from units and total price of units (e.g. units = 2e6, unitPrice = 1e5, unitDecimals = 6, priceDecimals = 6 => 0.2)
 * @param units - The units to convert e.g. 2e6
 * @param totalPrice - The unit price e.g. 1e5
 * @param unitDecimals - The unit decimals e.g. 6
 * @param priceDecimals - The price decimals e.g. 6
 * @param doAbs - do Math.abs on value of units?
 * @returns the total price for the given units using given unit price e.g. 0.2
 */
export const calcUnitPrice = (
  units: BigNumberish,
  totalPrice: BigNumberish,
  unitDecimals = 6,
  priceDecimals = 6,
  doAbs = false,
): AmountFormat => {
  if (doAbs)
    units = BN.from(units).abs()
  return getFormattedAmount(
    BN.from(totalPrice)
      .mul(bnPow(priceDecimals + unitDecimals))
      .div(units)
      .div(bnPow(priceDecimals))
      .toString(),
    priceDecimals,
  )
}

/**
 * calculate units from unit price and total price (e.g. unitPrice = 2e6, totalPrice = 1e5, priceDecimals = 6 => 0.05)
 * @param unitPrice - The price of single unit e.g. 2e6
 * @param totalPrice - The price of total units e.g. 1e5
 * @param priceDecimals - The price decimals e.g. 6
 * @returns the units for the given unit price and total price e.g. 0.05
 */
export const calcUnits = (
  unitPrice: BigNumberish,
  totalPrice: BigNumberish,
  unitDecimals = 6,
  priceDecimals = 6,
): AmountFormat => {
  return getFormattedAmount(
    BN.from(totalPrice)
      .mul(bnPow(priceDecimals + unitDecimals))
      .div(unitPrice)
      .div(bnPow(priceDecimals))
      .toString(),
    unitDecimals,
  )
}

/**
 * returns a n percent of the given BigNumberish (e.g. 10% of 100 = 10)
 * @param amount number to get percent of (e.g. 100)
 * @param percentage percent to get (e.g. 10)
 * @param decimals decimals for the amount (e.g. 6 for 1000000) (default: 6) (optional)
 * @returns percent of the given number (e.g. 10% of 100 = 10)
 */
export const getPercentOfAmount = (
  amount: BigNumberish,
  percentage: number | string,
  decimals: BigNumberish = 6,
): string => {
  return formatUnits(BN.from(amount).mul(parseUnits(percentage.toString(), decimals)), BN.from(decimals).add(2))
    .split('.')[0]
    .toString()
}

/**
 * calculates percentage from given amount and total amount (e.g. 100 from 10 = 10%)
 * @param amount number to get percent of (e.g. 100)
 * @param partialAmount percent to get (e.g. 10)
 * @param decimals decimals for the amount (e.g. 6 for 1000000) (default: 6) (optional)
 * @returns percentage of the given number from totalNumber (e.g. 100 from 10 = 10%)
 */
export const getPercentageOfAmount = (
  amount: BigNumberish,
  partialAmount: BigNumberish,
  decimals: BigNumberish = 6,
): number => {
  return Number(
    shortenDecimals(
      formatUnits(
        BN.from(partialAmount.toString()).mul(parseUnits('1', decimals)).div(amount.toString()),
        BN.from(decimals).sub(2),
      ),
      3,
    ),
  )
}

/**
 * Decrease the given number by a given percentage (e.g. 100 - 30% of 100 = 70)
 * @param amount The number to decrease
 * @param percentage The percentage to decrease by
 * @param decimals decimals for the amount (e.g. 6 for 1000000) (default: 6) (optional)
 * @returns The decreased number (e.g. 100 - 30% of 100 = 70)
 */
export const decreaseNumByPercentage = (
  amount: BigNumberish,
  percentage: number | string,
  decimals: BigNumberish = 6,
): string => {
  return BN.from(amount).sub(getPercentOfAmount(amount, percentage, decimals)).toString()
}

/**
 * Increase the given number by a given percentage (e.g. 100 + 30% of 100 = 130)
 * @param amount The number to increase
 * @param percentage The percentage to increase by
 * @param decimals decimals for the amount (e.g. 6 for 1000000) (default: 6) (optional)
 * @returns The increased number (e.g. 100 + 30% of 100 = 130)
 */
export const increaseNumByPercentage = (
  amount: BigNumberish,
  percentage: number | string,
  decimals: BigNumberish = 6,
): string => {
  return BN.from(amount).add(getPercentOfAmount(amount, percentage, decimals)).toString()
}
