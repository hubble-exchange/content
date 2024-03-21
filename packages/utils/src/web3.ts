import { BigNumber as BN } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { shortenDecimals } from './units/formatter'

export const bnPow = (decimal = 6, base = 10): string => {
  return BN.from(base).pow(decimal).toString()
}

export const bnToFloat = (num: BigNumberish, decimals = 6) => {
  return parseFloat(formatUnits(num.toString(), decimals))
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
