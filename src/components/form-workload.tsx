import { MinusIcon, PlusIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

type FormWorkloadProps = {
  daysPerWeek: number
  hoursPerDay: number
  cycleDurationInMinutes: number
  onDaysPerWeekChange: (daysPerWeek: number) => void
  onHoursPerDayChange: (hoursPerDay: number) => void
  onCycleDurationChange: (cycleDurationInMinutes: number) => void
}

export function FormWorkload({
  daysPerWeek,
  hoursPerDay,
  cycleDurationInMinutes,
  onDaysPerWeekChange,
  onHoursPerDayChange,
  onCycleDurationChange,
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

  const handleCycleDurationInMinutesChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(event.target.value)

    const MINIMUM_CYCLE_DURATION_IN_MINUTES = 1
    const MAXIMUM_CYCLE_DURATION_IN_MINUTES = 1440

    if (value < MINIMUM_CYCLE_DURATION_IN_MINUTES) {
      onCycleDurationChange(MINIMUM_CYCLE_DURATION_IN_MINUTES)
    } else if (value > MAXIMUM_CYCLE_DURATION_IN_MINUTES) {
      onCycleDurationChange(MAXIMUM_CYCLE_DURATION_IN_MINUTES)
    } else {
      onCycleDurationChange(value)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Horas de estudo diário</Label>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            placeholder="4"
            value={hoursPerDay}
            onChange={handleHoursPerDayChange}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="noShadow"
              onClick={() => {
                const MINIMUM_HOURS_PER_DAY = 1

                if (hoursPerDay > MINIMUM_HOURS_PER_DAY) {
                  onHoursPerDayChange(hoursPerDay - 1)
                }
              }}
            >
              <MinusIcon className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="noShadow"
              onClick={() => {
                const MAXIMUM_HOURS_PER_DAY = 24

                if (hoursPerDay < MAXIMUM_HOURS_PER_DAY) {
                  onHoursPerDayChange(hoursPerDay + 1)
                }
              }}
            >
              <PlusIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Dias por semana</Label>

        <div className="flex items-center gap-3">
          <Input
            type="number"
            placeholder="5"
            value={daysPerWeek}
            onChange={handleDaysPerWeekChange}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="noShadow"
              onClick={() => {
                const MINIMUM_DAYS_PER_WEEK = 1

                if (daysPerWeek > MINIMUM_DAYS_PER_WEEK) {
                  onDaysPerWeekChange(daysPerWeek - 1)
                }
              }}
            >
              <MinusIcon className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="noShadow"
              onClick={() => {
                const MAXIMUM_DAYS_PER_WEEK = 7

                if (daysPerWeek < MAXIMUM_DAYS_PER_WEEK) {
                  onDaysPerWeekChange(daysPerWeek + 1)
                }
              }}
            >
              <PlusIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Duração mínima do ciclo (minutos)</Label>

        <div className="flex items-center gap-3">
          <Input
            type="number"
            placeholder="60"
            value={cycleDurationInMinutes}
            onChange={handleCycleDurationInMinutesChange}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="noShadow"
              onClick={() => {
                const MINIMUM_CYCLE_DURATION_IN_MINUTES = 60

                if (
                  cycleDurationInMinutes > MINIMUM_CYCLE_DURATION_IN_MINUTES
                ) {
                  onCycleDurationChange(cycleDurationInMinutes - 1)
                }
              }}
            >
              <MinusIcon className="size-3" />
            </Button>
            <Button
              size="sm"
              variant="noShadow"
              onClick={() => {
                const MAXIMUM_CYCLE_DURATION_IN_MINUTES = 1440

                if (
                  cycleDurationInMinutes < MAXIMUM_CYCLE_DURATION_IN_MINUTES
                ) {
                  onCycleDurationChange(cycleDurationInMinutes + 1)
                }
              }}
            >
              <PlusIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
