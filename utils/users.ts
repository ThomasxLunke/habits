import 'server-only'
import { COOKIE_AUTH } from './constants'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserFromToken } from './authTools'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const token = cookies().get(COOKIE_AUTH)
  if (!token) redirect('/signin')

  const user = await getUserFromToken(token)
  if (!user) redirect('/signin')

  return user
})