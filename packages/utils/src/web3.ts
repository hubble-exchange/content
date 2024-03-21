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
