import { formatUnits } from '@ethersproject/units'
import { describe, expect, it } from 'vitest'
import {
  decreaseNumByPercentage,
  getFormattedAmount, getPercentOfAmount, getPercentageOfAmount, increaseNumByPercentage,
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
