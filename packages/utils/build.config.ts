import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index', './src/mongo', './src/pagerduty'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
