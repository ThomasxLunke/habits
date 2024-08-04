import HabitsCards from '@/components/HabitsCards'
import { getCurrentUser } from '@/utils/users'
import React from 'react'

export default async function page() {
  const user = await getCurrentUser()
  return (
    <HabitsCards habits={user.habits} />
  )
}
