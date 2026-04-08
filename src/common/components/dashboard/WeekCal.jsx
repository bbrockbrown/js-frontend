import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { createEventModalPlugin } from '@schedule-x/event-modal'
 
function WeekCal() { 
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const calendar = useCalendarApp(
      {
        views: [createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [
            {
              id: '1',
              title: 'Grocery Giveaway (8/10)',
              start: Temporal.ZonedDateTime.from('2026-03-15T02:00:00-05:00[America/Chicago]'),
              end: Temporal.ZonedDateTime.from('2026-03-15T04:00:00-05:00[America/Chicago]'),
              description: 'At the corner of Church and Dodge families facing food insecurity can come pick-up a free bag of groceries for their household. '
            },
            {
              id: '2',
              title: 'Grocery Giveaway (7/10)',
              start: Temporal.ZonedDateTime.from('2026-03-22T02:00:00-05:00[America/Chicago]'),
              end: Temporal.ZonedDateTime.from('2026-03-22T04:00:00-05:00[America/Chicago]'),
              description: 'At the corner of Church and Dodge families facing food insecurity can come pick-up a free bag of groceries for their household. '
            },
            {
              id: '3',
              title: 'Grocery Giveaway (5/10)',
              start: Temporal.ZonedDateTime.from('2026-03-29T02:00:00-05:00[America/Chicago]'),
              end: Temporal.ZonedDateTime.from('2026-03-29T04:00:00-05:00[America/Chicago]'),
              description: 'At the corner of Church and Dodge families facing food insecurity can come pick-up a free bag of groceries for their household. '
            },
            {
              id: '4',
              title: 'Grocery Giveaway (3/10)',
              start: Temporal.ZonedDateTime.from('2026-04-05T02:00:00-05:00[America/Chicago]'),
              end: Temporal.ZonedDateTime.from('2026-04-05T04:00:00-05:00[America/Chicago]'),
              description: 'At the corner of Church and Dodge families facing food insecurity can come pick-up a free bag of groceries for their household. '
            }
          ],
          plugins: [eventsService, createEventModalPlugin()]
      })

        useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])

  return (
      <ScheduleXCalendar calendarApp={calendar} />
  )
}
 
export default WeekCal