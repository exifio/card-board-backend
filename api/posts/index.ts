import type { VercelRequest, VercelResponse } from '@vercel/node'
import { applyCors, handlePreflight, sendError } from '../../lib/cors.js'
import { getSupabase } from '../../lib/supabase.js'
import { parsePostInput } from '../../lib/validate.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return
  applyCors(req, res)

  try {
    const supabase = getSupabase()

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, content, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (error) {
        sendError(res, 500, '게시글 목록을 불러오지 못했습니다.')
        return
      }

      res.status(200).json(data)
      return
    }

    if (req.method === 'POST') {
      const input = parsePostInput(req.body)

      if (!input) {
        sendError(res, 400, '제목과 내용을 모두 입력해주세요.')
        return
      }

      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: input.title,
          content: input.content,
          created_at: now,
          updated_at: now,
        })
        .select('id, title, content, created_at, updated_at')
        .single()

      if (error || !data) {
        sendError(res, 500, '게시글을 저장하지 못했습니다.')
        return
      }

      res.status(201).json(data)
      return
    }

    sendError(res, 405, '허용되지 않은 요청입니다.')
  } catch (error) {
    const message = error instanceof Error ? error.message : '서버 오류가 발생했습니다.'
    sendError(res, 500, message)
  }
}
