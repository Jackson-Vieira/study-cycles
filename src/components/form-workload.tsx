import { Input } from './ui/input'
import { Label } from './ui/label'

type FormWorkloadProps = {
  daysPerWeek: number
  hoursPerDay: number
  onDaysPerWeekChange: (daysPerWeek: number) => void
  onHoursPerDayChange: (hoursPerDay: number) => void
}

export function FormWorkload({
  daysPerWeek,
  hoursPerDay,
  onDaysPerWeekChange,
  onHoursPerDayChange,
}: FormWorkloadProps) {
  const handleHoursPerDayChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)

    const MINIMUM_HOURS_PER_DAY = 1
    const MAXIMUM_HOURS_PER_DAY = 24

    if (value < MINIMUM_HOURS_PER_DAY) {
      onHoursPerDayChange(MINIMUM_HOURS_PER_DAY)
    } else if (value > MAXIMUM_HOURS_PER_DAY) {
      onHoursPerDayChange(MAXIMUM_HOURS_PER_DAY)
    } else {
      onHoursPerDayChange(value)
    }
  }

  const handleDaysPerWeekChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)

    const MINIMUM_DAYS_PER_WEEK = 1
    const MAXIMUM_DAYS_PER_WEEK = 7

    if (value < MINIMUM_DAYS_PER_WEEK) {
      onDaysPerWeekChange(MINIMUM_DAYS_PER_WEEK)
    } else if (value > MAXIMUM_DAYS_PER_WEEK) {
      onDaysPerWeekChange(MAXIMUM_DAYS_PER_WEEK)
    } else {
      onDaysPerWeekChange(value)
    }
  }

  return (
    <form method="post">
      <div className="space-y-2">
        <Label>Horas de estudo diário</Label>
        <Input
          type="number"
          placeholder="4"
          value={hoursPerDay}
          onChange={handleHoursPerDayChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Dias por semana</Label>
        <Input
          type="number"
          placeholder="5"
          value={daysPerWeek}
          onChange={handleDaysPerWeekChange}
        />
      </div>
    </form>
  )
}
