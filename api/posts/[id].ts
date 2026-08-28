import type { VercelRequest, VercelResponse } from '@vercel/node'
import { applyCors, handlePreflight, sendError } from '../../lib/cors'
import { getSupabase } from '../../lib/supabase'
import { parsePostId, parsePostInput } from '../../lib/validate'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handlePreflight(req, res)) return
  applyCors(req, res)

  const id = parsePostId(req.query.id)

  if (!id) {
    sendError(res, 400, '올바르지 않은 게시글 id입니다.')
    return
  }

  try {
    const supabase = getSupabase()

    if (req.method === 'PUT') {
      const input = parsePostInput(req.body)

      if (!input) {
        sendError(res, 400, '제목과 내용을 모두 입력해주세요.')
        return
      }

      const now = new Date().toISOString()
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: input.title,
          content: input.content,
          updated_at: now,
        })
        .eq('id', id)
        .select('id, title, content, created_at, updated_at')
        .single()

      if (error) {
        sendError(res, 500, '게시글을 수정하지 못했습니다.')
        return
      }

      if (!data) {
        sendError(res, 404, '게시글을 찾을 수 없습니다.')
        return
      }

      res.status(200).json(data)
      return
    }

    if (req.method === 'DELETE') {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .select('id')
        .maybeSingle()

      if (error) {
        sendError(res, 500, '게시글을 삭제하지 못했습니다.')
        return
      }

      if (!data) {
        sendError(res, 404, '게시글을 찾을 수 없습니다.')
        return
      }

      res.status(204).end()
      return
    }

    sendError(res, 405, '허용되지 않은 요청입니다.')
  } catch (error) {
    const message = error instanceof Error ? error.message : '서버 오류가 발생했습니다.'
    sendError(res, 500, message)
  }
}
