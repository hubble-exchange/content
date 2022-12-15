// String/Number formatters
export const shortenString = (value: string, [startCount = 4, endCount = 4, ellipse = '...'] = []): string => {
  if (value.length > startCount + endCount) {
    const start = value.slice(0, startCount)
    const end = value.slice(value.length - endCount)
    return start + ellipse + end
  }
  return value
}

export const getSmallestDecimalString = (amount: string | number, decimals = 4): string => {
  if (decimals > 0 && Number(amount) > 0 && Number(amount) < Number(`0.${'0'.repeat(decimals - 1)}1`))
    return `< 0.${'0'.repeat(decimals - 1)}1`

  if (decimals > 0 && Number(amount) < 0 && Number(amount) > Number(`-0.${'0'.repeat(decimals - 1)}9`))
    return `< -0.${'0'.repeat(decimals - 1)}9`

  return String(amount)
}

export const removeExtraZeros = (amount: string | number): string => {
  return `${amount}`.replace(/^0*(\d+|\d+\.\d+?)\.?0*$/, '$1') // remove tailing zeros after decimal point
}

export const shortenDecimals = (amount: string | number, decimals = 4, minNum = false): string => {
  if (minNum) {
    const minAmount = getSmallestDecimalString(amount, decimals) // if minNum is true, return the minimum value to display
    if (minAmount !== String(amount))
      return minAmount
  }

  const parts = `${amount}`.split('.')
  if (parts.length === 2) {
    const formattedDecimals = parts[1].slice(0, decimals)
    if (decimals <= 0 || Number(formattedDecimals) <= 0)
      return Number(parts[0]) === 0 ? '0' : parts[0]
    // remove tailing zeros after decimal point
    return removeExtraZeros(`${parts[0]}.${formattedDecimals}`)
  }
  return removeExtraZeros(amount)
}

/**
 * Add Comma to a number or amount string with comma to make it more readable for user (e.g. 1000000 to 1,000,000)
 * @param amount amount to format with comma
 * @param ignoreDecimals default true, if true, returns amount with comma included comma in decimals
 * @returns {string} formatted amount with comma
 */
export const addCommaToAmount = (amount: string | number, ignoreDecimals = true): string => {
  if (ignoreDecimals) {
    const parts = `${amount}`.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (parts.length === 2)
      return parts.join('.')
    return parts[0]
  }

  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getTimestampedID = (): string => {
  return (Math.random().toString(36) + Date.now().toString(36)).substr(2)
}

export const timeDiffToString = (time: { days: number; hours: number; mins: number; secs: number }): string => {
  let timeInWords = ''
  if (time.days > 0)
    timeInWords += `${time.days}d `

  if (time.hours > 0)
    timeInWords += `${time.hours}h `

  if (time.mins > 0)
    timeInWords += `${time.mins}m `

  if (time.secs > 0)
    timeInWords += `${time.secs}s`

  return timeInWords.trim()
}

// Pagination helpers
export interface Page {
  items: unknown[]
  page: number
  limit: number
  hasPrev: boolean
  hasNext: boolean
  start?: number
  end?: number
}

const paginate = (items: unknown[], page: number, limit: number): Page => {
  const start = page * limit - limit
  const end = start + limit

  return {
    items: [...items].splice(start, limit),
    page,
    limit,
    hasPrev: page > 1,
    hasNext: end < items.length,
    start,
    end,
  }
}

const getPageNumberArray = (length: number, limit: number): number[] => {
  const pageNumberArray: number[] = []
  for (let i = 1; i <= Math.ceil(length / limit); i++)
    pageNumberArray.push(i)

  return pageNumberArray
}

export const pagination = {
  paginate,
  getPageNumberArray,
}
