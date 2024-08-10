'use client'

import { DialogAddSubject } from '@/components/dialog-add-subject'
import { useCallback, useState } from 'react'
import { FormWorkload } from './form-workload'
import { useWorkload } from '@/hooks/use-workload'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Dialog, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { useLocalStorage } from '@/hooks/use-local-storage'

type Subject = {
  subject: string
  level: 'terrible' | 'bad' | 'more-or-less' | 'good' | 'great'
  checkedHours: number
}

const SUBJECT_LEVEL: Record<Subject['level'], number> = {
  terrible: 5,
  bad: 4,
  'more-or-less': 3,
  good: 2,
  great: 1,
} as const

export function StudyCycleTable() {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', [])

  const [isOpen, setIsOpen] = useState(false)

  const { daysPerWeek, hoursPerDay, setDaysPerWeek, setHoursPerDay } =
    useWorkload()

  const calculateHourBySubject = ({ level }: Subject) => {
    const totalHours = daysPerWeek * hoursPerDay

    const totalWeight = subjects.reduce(
      (acc, subject) => acc + SUBJECT_LEVEL[subject.level],
      0,
    )

    const weight = totalHours / totalWeight

    return Math.max(2, Math.round(weight * SUBJECT_LEVEL[level]))
  }

  const handleAddSubject = useCallback(
    (subject: Omit<Subject, 'checkedHours'>) => {
      setSubjects((prev) => [...prev, { ...subject, checkedHours: 0 }])
      setIsOpen(false)
    },
    [setSubjects],
  )

  const handleDeleteSubject = useCallback(
    (index: number) => {
      setSubjects((prev) => prev.filter((_, i) => i !== index))
    },
    [setSubjects],
  )

  const handleCheckboxChange = useCallback(
    (subjectIndex: number, hourIndex: number, isChecked: boolean) => {
      setSubjects((prev) =>
        prev.map((subject, index) =>
          index === subjectIndex
            ? {
                ...subject,
                checkedHours: isChecked
                  ? Math.max(subject.checkedHours, hourIndex + 1)
                  : Math.min(subject.checkedHours, hourIndex),
              }
            : subject,
        ),
      )
    },
    [setSubjects],
  )

  return (
    <div className="max-w-7xl p-4 mx-auto w-full space-y-6">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="size-4" />
            Adicionar matéria
          </Button>
        </DialogTrigger>
        <DialogAddSubject onAddSubject={handleAddSubject} />
      </Dialog>
      <div className="grid gap-6 md:grid-cols-9">
        <div className="order-2 md:order-1 md:col-span-6">
          <div className="rounded border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20"></TableHead>
                  <TableHead className="w-64">Matéria</TableHead>
                  <TableHead>Horas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="p-0"
                        onClick={() => handleDeleteSubject(index)}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </TableCell>
                    <TableCell>{subject.subject}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {Array(calculateHourBySubject(subject))
                          .fill(0)
                          .map((_, hourIndex) => (
                            <Checkbox
                              key={hourIndex}
                              checked={hourIndex < subject.checkedHours}
                              onCheckedChange={(isChecked) =>
                                handleCheckboxChange(
                                  index,
                                  hourIndex,
                                  isChecked as boolean,
                                )
                              }
                            />
                          ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="order-1 md:order-2 md:col-span-3">
          <div className="rounded-md border p-4">
            <FormWorkload
              daysPerWeek={daysPerWeek}
              hoursPerDay={hoursPerDay}
              onDaysPerWeekChange={setDaysPerWeek}
              onHoursPerDayChange={setHoursPerDay}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
