export * from './formatter'
export * from './web3'
export * from './units/unscale'
export * from './units/scale'

export const simulateAsyncPause = (duration = 1000) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration)
  })

export const range = (start: number, stop: number, step = 1): number[] =>
  Array(Math.ceil((stop + 1 - start) / step))
    .fill(start)
    .map((x: number, y: number): number => x + y * step)
