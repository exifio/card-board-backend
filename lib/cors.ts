import type { VercelRequest, VercelResponse } from '@vercel/node'

export function applyCors(req: VercelRequest, res: VercelResponse) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN ?? '*'
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export function handlePreflight(req: VercelRequest, res: VercelResponse): boolean {
  applyCors(req, res)

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return true
  }

  return false
}

export function sendError(res: VercelResponse, status: number, message: string) {
  res.status(status).json({ message })
}
