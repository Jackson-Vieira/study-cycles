import { useLocalStorage } from '@uidotdev/usehooks'

export const useWorkload = () => {
  const [workload, setWorkload] = useLocalStorage('workload', {
    hoursPerDay: 4,
    daysPerWeek: 5,
    cycleDurationInMinutes: 60,
  })

  const { daysPerWeek, hoursPerDay, cycleDurationInMinutes } = workload

  const setDaysPerWeek = (daysPerWeek: number) =>
    setWorkload((prev) => ({ ...prev, daysPerWeek }))

  const setHoursPerDay = (hoursPerDay: number) =>
    setWorkload((prev) => ({ ...prev, hoursPerDay }))

  const setCycleDuration = (cycleDurationInMinutes: number) =>
    setWorkload((prev) => ({ ...prev, cycleDurationInMinutes }))

  return {
    daysPerWeek,
    hoursPerDay,
    cycleDurationInMinutes,
    setDaysPerWeek,
    setHoursPerDay,
    setCycleDuration,
  }
}
