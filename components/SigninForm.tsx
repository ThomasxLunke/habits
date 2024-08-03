'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { signinUser } from '@/actions/auth'

const initState = { message: null }


export default function SigninForm() {
  const [formState, action] = useFormState<{ message: string | null }>(
    signinUser,
    initState
  )
  // const { pending } = useFormStatus()

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Se connecter</CardTitle>
        <CardDescription>Saisissez votre nom de compte et votre mot de passe.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}
        >
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor="email">Nom de compte</Label>
              <Input name='email' id="email" placeholder='TOTOPGM971' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor="password">Mot de passe</Label>
              <Input name='password' type='password' id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
            </div>
            <Button type='submit'>Se connecter</Button>
          </div>
          {formState?.message && <p>{formState.message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
