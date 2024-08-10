import { useLocalStorage } from './use-local-storage'

export const useWorkload = () => {
  const [hoursPerDay, setHoursPerDay] = useLocalStorage('hoursPerDay', 4)
  const [daysPerWeek, setDaysPerWeek] = useLocalStorage('daysPerWeek', 5)

  return {
    hoursPerDay,
    setHoursPerDay,
    daysPerWeek,
    setDaysPerWeek,
  }
}
