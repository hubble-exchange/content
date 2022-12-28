import { event } from '@pagerduty/pdjs'

type Severity = 'critical' | 'error' | 'warning' | 'info'

export function reportOnPagerDuty(severity: Severity, summary: string, routingKey: string, custom_details?: any, error?: Error) {
  if (!routingKey) {
    console.error('Pagerduty key not given')
    return
  }
  custom_details = custom_details || {}
  if (error)
    custom_details.error = error

  event({
    data: {
      routing_key: routingKey,
      event_action: 'trigger',
      dedup_key: '',
      payload: {
        summary,
        source: 'newrepo',
        severity,
        timestamp: new Date().toISOString(),
        custom_details,
      },
    },
  }).catch((err) => {
    console.error(`Error in reporting to pagerduty, err = ${err}, severity = ${severity}, 
    summary = ${summary}, custom_details = ${custom_details}`)
  }).finally(() => {
    /* eslint-disable-next-line no-console */
    console.log(`Reported on pagerduty - ${summary}`)
  })
}
