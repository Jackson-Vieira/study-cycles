'use client'

import { useState } from 'react'
import { Input } from './ui/input'

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
}

export function EditableText({ value, onChange }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)

  return isEditing ? (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setIsEditing(false)}
      className="h-8"
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  )
}
