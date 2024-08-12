'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Button, buttonVariants } from '../ui/button'
import { Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'
import { FormWorkloadSkeleton } from './form-workload-skeleton'

export function StudyCyclesSkeleton() {
  return (
    <div className="max-w-7xl p-4 mx-auto w-full space-y-6">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
        <Button size="sm" className="flex items-center gap-1 w-fit" disabled>
          <Plus className="size-4" />
          Adicionar matéria
        </Button>

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
      </div>
      <div className="grid gap-6 md:grid-cols-9">
        <div className="order-2 md:order-1 md:col-span-6">
          <div className="rounded-base shadow-light dark:shadow-dark text-black">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 md:w-20"></TableHead>
                  <TableHead className="w-32 md:w-64">Matéria</TableHead>
                  <TableHead>Horas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(3)
                  .fill('')
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Button size="sm" disabled>
                          <Trash className="size-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-full h-4" />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap items-center gap-3 md:gap-1.5">
                          {Array(12)
                            .fill('')
                            .map((_, index) => (
                              <Skeleton
                                key={index}
                                className="size-4 rounded-none"
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
          <div className="rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main text-black p-4">
            <FormWorkloadSkeleton />
          </div>
        </div>
      </div>
    </div>
  )
}
