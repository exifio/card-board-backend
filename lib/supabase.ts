import { createClient } from '@supabase/supabase-js'

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`)
  }
  return value
}

export function getSupabase() {
  return createClient(getEnv('SUPABASE_URL'), getEnv('SUPABASE_SECRET_KEY'))
}
