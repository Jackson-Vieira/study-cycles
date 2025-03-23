'use client'

import { useCallback, useMemo, useState } from 'react'
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
import { Button, buttonVariants } from './ui/button'
import { Plus, Trash } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import Link from 'next/link'
import { useLocalStorage, useWindowSize } from '@uidotdev/usehooks'
import { EditableText } from './editable-text'
import Confetti from 'react-confetti'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { ModeToggle } from './toggler-theme'

type Subject = {
  id: string
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

const SUBJECT_LEVEL_LABELS: Record<Subject['level'], string> = {
  terrible: '😖 Péssimo',
  bad: '😕 Ruim',
  'more-or-less': '😐 Mais ou menos',
  good: '🙂 Bom',
  great: '😄 Ótimo',
} as const

export function StudyCycles() {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('subjects', [])

  const [shouldShowConfetti, setShouldShowConfetti] = useState(false)

  const { width, height } = useWindowSize()
  const isDimensionsReady = width && height

  const {
    daysPerWeek,
    hoursPerDay,
    setDaysPerWeek,
    setHoursPerDay
  } = useWorkload()

  const calculateHourBySubject = useMemo(
    () =>
      ({ level }: Subject) => {
        const totalHours = daysPerWeek * hoursPerDay

        const totalWeight = subjects.reduce(
          (acc, subject) => acc + SUBJECT_LEVEL[subject.level],
          0,
        )

        const weight = totalHours / totalWeight

        const subjectLevelWeight = SUBJECT_LEVEL[level] * weight

        return Math.max(2, Math.round(subjectLevelWeight))
      },
    [subjects, daysPerWeek, hoursPerDay]
  )

  const handleAddSubject = useCallback(() => {
    const subject: Omit<Subject, 'checkedHours'> = {
      id: crypto.randomUUID(),
      subject: 'Nome da Máteria',
      level: 'great',
    }
    setSubjects((prev) => [...prev, { ...subject, checkedHours: 0 }])
  }, [setSubjects])

  const handleDeleteSubject = useCallback(
    (index: number) => {
      setSubjects((prev) => prev.filter((_, i) => i !== index))
    },
    [setSubjects],
  )

  const handleCheckboxChange = useCallback(
    (subjectIndex: number, hourIndex: number, isChecked: boolean) => {
      setSubjects((prev) =>
        prev.map((subject, index) => {
          if (index === subjectIndex) {
            const newCheckedHours = isChecked
              ? Math.max(subject.checkedHours, hourIndex + 1)
              : Math.min(subject.checkedHours, hourIndex)

            if (newCheckedHours === calculateHourBySubject(subject)) {
              setShouldShowConfetti(true)

              const SHOW_CONFETTI_DURING = 3000

              setTimeout(
                () => setShouldShowConfetti(false),
                SHOW_CONFETTI_DURING,
              )
            }

            return { ...subject, checkedHours: newCheckedHours }
          }
          return subject
        }),
      )
    },
    [setSubjects, calculateHourBySubject],
  )

  const handleSubjectChange = useCallback(
    (index: number, value: string) => {
      setSubjects((prev) =>
        prev.map((subject, i) =>
          i === index ? { ...subject, subject: value } : subject,
        ),
      )
    },
    [setSubjects],
  )

  const handleLevelChange = useCallback(
    (index: number, level: Subject['level']) => {
      setSubjects((prev) =>
        prev.map((subject, i) =>
          i === index ? { ...subject, level } : subject,
        ),
      )
    },
    [setSubjects],
  )

  return (
    <>
      <div className="max-w-7xl p-4 mx-auto w-full space-y-6">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          <Link
            href="https://youtu.be/AjU0UmGHm2Q?si=l1K9mtCUKjMuaKk5"
            target="_blank"
            className={buttonVariants({ variant: 'link' })}
          >
            <span className="hidden md:block">
              COMO MONTAR UMA ROTINA FLEXÍVEL | CICLO DE ESTUDOS
            </span>
            <span className="block md:hidden">CICLO DE ESTUDOS</span>
          </Link>

          <ModeToggle />
        </div>
        <div className="grid gap-6 md:grid-cols-9">
          <div className="order-2 md:order-1 md:col-span-6 space-y-4">
            <div className="rounded-base shadow-light dark:shadow-dark text-black">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32 md:w-64">Matéria</TableHead>
                    <TableHead className="w-32">Nível</TableHead>
                    <TableHead>Horas</TableHead>
                    <TableHead className="w-24" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={subject.id}>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <EditableText
                            value={subject.subject}
                            onChange={(value) =>
                              handleSubjectChange(index, value)
                            }
                          />
                          <strong>
                            ({subject.checkedHours}/
                            {calculateHourBySubject(subject)})
                          </strong>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={subject.level}
                          onValueChange={(value) => 
                            handleLevelChange(index, value as Subject['level'])
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(SUBJECT_LEVEL_LABELS).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                <span className="flex items-center gap-1 text-xs">
                                  {label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-3 md:gap-1.5">
                          {Array(calculateHourBySubject(subject))
                            .fill(0)
                            .map((_, hourIndex) => (
                              <Checkbox
                                key={`${subject.subject}-${hourIndex}`}
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
                      <TableCell>
                        <Button
                          variant="noShadow"
                          size="icon"
                          onClick={() => handleDeleteSubject(index)}
                        >
                          <Trash className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {subjects.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Nenhuma matéria adicionada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <Button
              size="sm"
              className="flex items-center gap-1 w-fit mx-auto"
              onClick={handleAddSubject}
            >
              <Plus className="size-4" />
              Adicionar matéria
            </Button>
          </div>
          <div className="order-1 md:order-2 md:col-span-3">
            <div className="rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main text-black p-4">
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
      {shouldShowConfetti && isDimensionsReady && (
        <Confetti height={height} width={width} />
      )}
    </>
  )
}
