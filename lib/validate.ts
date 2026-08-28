import type { PostInput } from '../types/post'

export function parsePostInput(body: unknown): PostInput | null {
  if (!body || typeof body !== 'object') {
    return null
  }

  const { title, content } = body as Record<string, unknown>

  if (typeof title !== 'string' || typeof content !== 'string') {
    return null
  }

  const trimmedTitle = title.trim()
  const trimmedContent = content.trim()

  if (!trimmedTitle || !trimmedContent) {
    return null
  }

  return {
    title: trimmedTitle,
    content: trimmedContent,
  }
}

export function parsePostId(value: string | string[] | undefined): number | null {
  const raw = Array.isArray(value) ? value[0] : value
  if (!raw) return null

  const id = Number(raw)
  if (!Number.isInteger(id) || id <= 0) {
    return null
  }

  return id
}
