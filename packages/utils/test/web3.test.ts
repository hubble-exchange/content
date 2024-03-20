import { BigNumber as BN } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'
import { describe, expect, it } from 'vitest'
import {
  calcTotalPrice, calcUnitPrice, calcUnits,
  decreaseNumByPercentage,
  getFormattedAmount, getPercentOfAmount, getPercentageOfAmount, increaseNumByPercentage,
  unScaleToBase,
} from '../src'

describe('increaseNumByPercentage', () => {
  it('Should increase given amount by given percent', () => {
    const num = '1248933'
    const percent = '25.5'
    const result = increaseNumByPercentage(num, percent)
    expect(result).toEqual('1567410')
    expect(formatUnits(result, 6)).toEqual('1.56741')
  })
  it('Add Slippage to amount', () => {
    const num = 100e6
    const percent = '0.05'
    const result = increaseNumByPercentage(num, percent)
    expect(result).toEqual('100050000')
    expect(formatUnits(result, 6)).toEqual('100.05')
  })
})

describe('decreaseNumByPercentage', () => {
  it('Should decrease given amount by given percent', () => {
    const num = '1248933'
    const percent = '25.5'
    const result = decreaseNumByPercentage(num, percent)
    expect(result).toEqual('930456')
    expect(formatUnits(result, 6)).toEqual('0.930456')
  })
  it('Remove Slippage from amount', () => {
    const num = 100e6
    const percent = '0.05'
    const result = decreaseNumByPercentage(num, percent)
    expect(result).toEqual('99950000')
    expect(formatUnits(result, 6)).toEqual('99.95')
  })
})

describe('getPercentageOfAmount', () => {
  it('1. Should return portion of given amount by given percent', () => {
    const num = '100000000'
    const partialNum = '25000000'
    const percent = 25
    const result = getPercentageOfAmount(num, partialNum)
    expect(result).toEqual(percent)
  })
  it('2. Should return portion of given amount by given percent', () => {
    const num = '1248933'
    const partialNum = '318477'
    const percent = 25.499
    const result = getPercentageOfAmount(num, partialNum, 6)
    expect(result).toEqual(percent)
  })
  it('3. Should return portion of given amount by given percent', () => {
    const num = '1248933'
    const partialNum = '1248932'
    const percent = 99.999
    const result = getPercentageOfAmount(num, partialNum, 6)
    expect(result).toEqual(percent)
  })
})

describe('getPercentOfAmount', () => {
  it('Should return portion of given amount by given percent', () => {
    const num = '1248933'
    const percent = 25.5
    const result = getPercentOfAmount(num, percent)
    expect(result).toEqual('318477')
    expect(formatUnits(result, 6)).toEqual('0.318477')
  })

  it('Should return portion of given amount by given percent', () => {
    const num = '1248933'
    const percent = 45.324624
    const result = getPercentOfAmount(num, percent)
    expect(result).toEqual('566074')
    expect(formatUnits(result, 6)).toEqual('0.566074')
  })
})

describe('unScaleToBase', () => {
  it('unScale to base amount by given decimals and returns string with no decimals', () => {
    const num = '45366240903847'
    const decimals = 6
    expect(unScaleToBase(num, decimals)).toEqual('45366240')
  })
})

describe('calcTotalPrice', () => {
  it('1. calculate total price for units using price per unit', () => {
    const units = 214
    const unitPrice = 201
    const unitDecimals = 2
    const priceDecimals = 2
    const res = '430'
    const out = calcTotalPrice(units, unitPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res)
  })

  it('2. calculate total price for units using price per unit', () => {
    const units = 653748394
    const unitPrice = 12032457
    const unitDecimals = 6
    const priceDecimals = 6
    const res = getFormattedAmount('7866199439')
    const out = calcTotalPrice(units, unitPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res.base)
  })

  it('3. calculate total price for units using price per unit', () => {
    const units = '12000000000000000000'
    const unitPrice = '1003306140'
    const unitDecimals = 18
    const priceDecimals = 6
    const res = getFormattedAmount('12039673680')
    const out = calcTotalPrice(units, unitPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res.base)
  })
})

describe('calcUnitPrice', () => {
  it('1. calculate 1 unit price for units and total price', () => {
    const units = 214
    const totalPrice = 430
    const unitDecimals = 2
    const priceDecimals = 2
    const res = '200'
    const out = calcUnitPrice(units, totalPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res)
  })

  it('2. calculate 1 unit price for units using total', () => {
    const units = 653748394
    const totalPrice = 7866199439
    const unitDecimals = 6
    const priceDecimals = 6
    const res = getFormattedAmount('12032456')
    const out = calcUnitPrice(units, totalPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res.base)
  })

  it('3. calculate 1 unit price for units using total', () => {
    const units = '12000000000000000000'
    const totalPrice = '12039673683'
    const unitDecimals = 18
    const priceDecimals = 6
    const res = getFormattedAmount('1003306140')
    const out = calcUnitPrice(units, totalPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res.base)
  })
})

describe('calcUnits', () => {
  it('1. calculate units from 1 unit price and total price', () => {
    const unitPrice = 400
    const totalPrice = 800
    const priceDecimals = 2
    const unitDecimals = 2
    const res = '200'
    const out = calcUnits(unitPrice, totalPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res)
  })

  it('2. calculate units from 1 unit price and total price', () => {
    const unitPrice = 23566774
    const totalPrice = '1273917398791872'
    const unitDecimals = 6
    const priceDecimals = 6
    const res = getFormattedAmount('54055654744763')
    const out = calcUnits(unitPrice, totalPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res.base)
  })

  it('3. calculate units from 1 unit price and total price', () => {
    const unitPrice = 2e6
    const totalPrice = 46e6
    const unitDecimals = 18
    const priceDecimals = 6
    const res = getFormattedAmount('23000000000000000000')
    const out = calcUnits(unitPrice, totalPrice, unitDecimals, priceDecimals)
    expect(out.base).toEqual(res.base)
  })
})

describe('getFormattedAmount', () => {
  it('should format amount', () => {
    const value = '1234567'
    const decimals = 6
    const out = getFormattedAmount(value, decimals)
    const expected = { base: '1234567', formatted: '1.234', formattedFull: '1.234567' }
    expect(out).toEqual(expected)
  })

  it('should format amount', () => {
    const value = '1234567'
    const decimals = 18
    const out = getFormattedAmount(value, decimals)
    const expected = { base: '1234567', formatted: '< 0.001', formattedFull: '0.000000000001234567' }
    expect(out).toEqual(expected)
  })
})

describe('calcAmountWithSlippage', () => {
  it('should format amount', () => {
    const value = '1234567'
    const decimals = 6
    const out = getFormattedAmount(value, decimals)
    const expected = { base: '1234567', formatted: '1.234', formattedFull: '1.234567' }
    expect(out).toEqual(expected)
  })

  it('should format amount', () => {
    const value = '1234567'
    const decimals = 18
    const out = getFormattedAmount(value, decimals)
    const expected = { base: '1234567', formatted: '< 0.001', formattedFull: '0.000000000001234567' }
    expect(out).toEqual(expected)
  })
})
