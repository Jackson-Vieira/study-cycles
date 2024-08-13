import { MinusIcon, PlusIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export function FormWorkloadSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Horas de estudo diário</Label>
        <div className="flex items-center gap-3">
          <Input type="number" placeholder="4" disabled />
          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="noShadow" disabled>
              <MinusIcon className="size-3" />
            </Button>
            <Button size="sm" variant="noShadow" disabled>
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
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            disabled
          />
          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="noShadow" disabled>
              <MinusIcon className="size-3" />
            </Button>
            <Button size="sm" variant="noShadow" disabled>
              <PlusIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Duração do ciclo (minutos)</Label>

        <div className="flex items-center gap-3">
          <Input
            type="number"
            placeholder="5"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            disabled
          />
          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="noShadow" disabled>
              <MinusIcon className="size-3" />
            </Button>
            <Button size="sm" variant="noShadow" disabled>
              <PlusIcon className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
