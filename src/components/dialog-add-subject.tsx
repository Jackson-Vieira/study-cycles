'use client'

import { Button } from './ui/button'
import { DialogContent } from './ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const items = [
  {
    id: 'terrible',
    label: 'Péssimo',
  },
  {
    id: 'bad',
    label: 'Ruim',
  },
  {
    id: 'more-or-less',
    label: 'Mais ou menos',
  },
  {
    id: 'good',
    label: 'Bom',
  },
  {
    id: 'great',
    label: 'Ótimo',
  },
] as const

const FormSchema = z.object({
  subject: z
    .string({
      required_error: 'Digite o nome da matéria',
    })
    .min(1, {
      message: 'O nome da máteria não pode ser vazio',
    }),
  level: z.enum(['terrible', 'bad', 'more-or-less', 'good', 'great'], {
    required_error: 'Selecione pelo menos um nível',
  }),
})

type FormSchema = z.infer<typeof FormSchema>

type DialogAddSubjectProps = {
  onAddSubject: (data: FormSchema) => void
}

export function DialogAddSubject({ onAddSubject }: DialogAddSubjectProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subject: '',
      level: 'terrible',
    },
  })

  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onAddSubject)}
          className="space-y-4"
          method="post"
        >
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matéria</FormLabel>
                <FormControl>
                  <Input placeholder="Matemática" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Selecione o nível de dificuldade</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {items.map((item) => (
                      <FormItem
                        key={item.id}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Adicionar</Button>
        </form>
      </Form>
    </DialogContent>
  )
}
