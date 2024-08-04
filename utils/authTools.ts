import 'server-only'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SECRET = 'use_an_ENV_VAR'

export const createTokenForUser = (userId: number) => {
  const token = jwt.sign({ id: userId }, SECRET)
  return token
}

export const getUserFromToken = async (token: {
  name: string
  value: string
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: number }

  const user = await prisma.user.findFirst({
    where: {
      id: payload.id
    },
    include: {
      habits: true
    }
  })

  return user
}

export const signin = async ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  const match = await prisma.user.findUnique({
    where: {
      email: email
    },
  })
  
  if (!match) throw new Error('invalid user')

  const correctPW = await comparePW(password, match.password)

  if (!correctPW) {
    throw new Error('invalid user')
  }

  const token = createTokenForUser(match.id)
  const { password: pw, ...user } = match

  return { user, token }
}

// export const signup = async ({
//   email,
//   password,
// }: {
//   email: string
//   password: string
// }) => {
//   const hashedPW = await hashPW(password)
//   const rows = await db
//     .insert(users)
//     .values({ email, password: hashedPW })
//     .returning({
//       id: users.id,
//       email: users.email,
//       createdAt: users.createdAt,
//     })

//   const user = rows[0]
//   const token = createTokenForUser(user.id)

//   return { user, token }
// }

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW)
}
