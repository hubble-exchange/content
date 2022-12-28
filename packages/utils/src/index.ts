export * from './formatter'
export * from './mongo'
export * from './pagerduty'
export * from './web3'

export const simulateAsyncPause = (duration = 1000) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), duration)
  })

export const range = (start: number, stop: number, step = 1): number[] =>
  Array(Math.ceil((stop + 1 - start) / step))
    .fill(start)
    .map((x: number, y: number): number => x + y * step)
