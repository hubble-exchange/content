export * from './formatter'
export * from './units/unscale'
export * from './units/scale'
export * from './units/bigUtils'
export * from './units/price'
export * from './units/formatter'

export const simulateAsyncPause = (duration = 1000) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration)
  })

export const range = (start: number, stop: number, step = 1): number[] => {
  if (step <= 0)
    return []

  // Correctly calculate the number of elements in the range.
  const size = Math.ceil((stop - start + 1) / step)
  const result: number[] = new Array(size)

  for (let i = 0; i < size; i++)
    result[i] = start + i * step

  return result
}
