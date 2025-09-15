// import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '../lib/types'
import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
//     console.log("session",session)
    return payload
  } catch (error) {
    console.error('Failed to verify session',error)
  }
}

export async function createSession(userId: string,role:string,isVerified:boolean) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, role,expiresAt,isVerified })
  
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
//    redirect("/profile")
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}