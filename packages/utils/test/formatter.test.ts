import { describe, expect, it } from 'vitest'
import {
  getSmallestDecimalString,
  getTimestampedID,
  pagination,
  range,
  removeExtraZeros,
  shortenDecimals,
  shortenString,
  timeDiffToString,
} from '../src'

describe('shortenString', () => {
  it('shorten string by 4 character from both side and concat with ...', () => {
    expect(shortenString('this should work like this')).toEqual('this...this')
  })
  it('shorten string with custom characters', () => {
    expect(shortenString('this should work like this', [4, 6])).toEqual('this...e this')
  })
  it('shorten string with custom characters and concat with custom ellipse', () => {
    expect(shortenString('this should work like this', [4, 4, '---'])).toEqual('this---this')
  })
})

describe('getSmallestDecimalString', () => {
  it('positive ignore value with no decimal', () => {
    expect(getSmallestDecimalString('100', 2)).toEqual('100')
  })
  it('positive smallest value with given decimal', () => {
    expect(getSmallestDecimalString('0.009', 2)).toEqual('< 0.01')
  })
  it('negative ignore if value bigger than 0.009', () => {
    expect(getSmallestDecimalString('-100', 2)).toEqual('-100')
  })
  it('negative smallest value with given decimal', () => {
    expect(getSmallestDecimalString('-0.007', 2)).toEqual('< -0.09')
  })
})

describe('shortenDecimals', () => {
  it('ignore value with no decimal places', () => {
    expect(shortenDecimals('100', 2)).toEqual('100')
    expect(shortenDecimals('-100', 2)).toEqual('-100')
  })
  it('smallest value with decimal places', () => {
    expect(shortenDecimals('0.009', 2)).toEqual('0')
    expect(shortenDecimals('-0.0002', 2)).toEqual('0')
    expect(shortenDecimals('0.009', 2, true)).toEqual('< 0.01')
    expect(shortenDecimals('-0.007', 2, true)).toEqual('< -0.09')
  })
  it('values with decimal places', () => {
    expect(shortenDecimals('-10.007', 2)).toEqual('-10')
    expect(shortenDecimals('-10.007', 0, true)).toEqual('-10')
    expect(shortenDecimals('12.992', 0, true)).toEqual('12')
    expect(shortenDecimals('67.992', 1, true)).toEqual('67.9')
  })
})

describe('removeExtraZeros', () => {
  it('ignore value with no decimal places or tailing zeros', () => {
    expect(removeExtraZeros('1000')).toEqual('1000')
    expect(removeExtraZeros(1000.3)).toEqual('1000.3')
  })
  it('remove tailing zeros', () => {
    expect(removeExtraZeros('299.')).toEqual('299')
    expect(removeExtraZeros('001.69000')).toEqual('1.69')
    expect(removeExtraZeros('1000.3')).toEqual('1000.3')
  })
})

describe('getTimestampedID', () => {
  it('random string from timestamp', () => {
    expect(getTimestampedID()).toBeTypeOf('string')
  })
})

describe('pagination', () => {
  it('generate pagination for array', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const page = 1
    const limit = 2
    const expected = { items: [1, 2], page, limit, hasPrev: page > 1, hasNext: true, start: 0, end: 2 }
    expect(pagination.paginate(array, page, limit)).toEqual(expected)
    expect(pagination.paginate(array, 0, 0)).toEqual({ ...expected, items: [], page: 0, limit: 0, end: 0 })
  })

  it('generate possible page numbers as array', () => {
    const array = [11, 22, 23, 34, 55, 76, 77, 8, 239, 10]
    const limit = 2
    const expected = [1, 2, 3, 4, 5]
    expect(pagination.getPageNumberArray(array.length, limit)).toEqual(expected)
  })
})

describe('timeDiffToString', () => {
  it('convert time in words', () => {
    expect(timeDiffToString({ days: 1, hours: 3, mins: 5, secs: 2 })).toEqual('1d 3h 5m 2s')
    expect(timeDiffToString({ days: 2, hours: 0, mins: 0, secs: 0 })).toEqual('2d')
    expect(timeDiffToString({ days: 0, hours: 1, mins: 0, secs: 0 })).toEqual('1h')
    expect(timeDiffToString({ days: 0, hours: 0, mins: 3, secs: 0 })).toEqual('3m')
    expect(timeDiffToString({ days: 0, hours: 0, mins: 0, secs: 2 })).toEqual('2s')
    expect(timeDiffToString({ days: 0, hours: 1, mins: 0, secs: 59 })).toEqual('1h 59s')
    expect(timeDiffToString({ days: 0, hours: 1, mins: 10, secs: 0 })).toEqual('1h 10m')
    expect(timeDiffToString({ days: 0, hours: 0, mins: 0, secs: 0 })).toEqual('')
    expect(timeDiffToString({ days: 0, hours: -1, mins: -12, secs: 0 })).toEqual('')
    expect(timeDiffToString({ days: 0, hours: -1, mins: -12, secs: 0 }, true)).toEqual('-1h 12m')
  })
})

describe('range', () => {
  it('generates range from n to n', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(range(10, 15)).toEqual([10, 11, 12, 13, 14, 15])
    expect(range(100, 106, 2)).toEqual([100, 102, 104, 106])
    expect(range(100, 109, 2)).toEqual([100, 102, 104, 106, 108])
  })
})
