import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (match) process.env[match[1]] = match[2].trim()
  })
}

const { default: postsHandler } = await import('./api/posts/index.ts')
const { default: postDetailHandler } = await import('./api/posts/[id].ts')

const port = Number(process.env.PORT) || 3000

const server = http.createServer(async (rawReq, rawRes) => {
  const url = new URL(rawReq.url || '/', `http://localhost:${port}`)
  const pathname = url.pathname

  const res = rawRes as unknown as VercelResponse
  res.status = (code: number) => {
    rawRes.statusCode = code
    return res
  }
  res.json = (data: unknown) => {
    rawRes.setHeader('Content-Type', 'application/json; charset=utf-8')
    rawRes.end(JSON.stringify(data))
    return res
  }

  const buffers: Buffer[] = []
  for await (const chunk of rawReq) {
    buffers.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  const bodyText = Buffer.concat(buffers).toString('utf8')
  const req = rawReq as unknown as VercelRequest
  if (bodyText) {
    try {
      req.body = JSON.parse(bodyText)
    } catch {
      req.body = bodyText
    }
  } else {
    req.body = undefined
  }

  const queryObj = Object.fromEntries(url.searchParams.entries())
  req.query = queryObj

  if (pathname === '/api/posts' || pathname === '/api/posts/') {
    return postsHandler(req, res)
  }

  const match = pathname.match(/^\/api\/posts\/([^\/]+)$/)
  if (match) {
    req.query.id = match[1]
    return postDetailHandler(req, res)
  }

  rawRes.statusCode = 404
  rawRes.end('Not Found')
})

server.listen(port, () => {
  console.log(`> 카드 게시판 백엔드 서버가 실행되었습니다: http://localhost:${port}`)
})
