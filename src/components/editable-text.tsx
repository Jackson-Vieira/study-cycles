'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
}

export function EditableText({ value, onChange }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }

  return isEditing ? (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setIsEditing(false)}
      className="h-8"
      onKeyDown={handleOnKeyDown}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  )
}
