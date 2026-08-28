# Card Board Backend

카드 게시판 REST API 서버입니다.

## 기술 스택

- TypeScript
- Vercel Serverless Functions
- Supabase

## API

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/posts` | 게시글 목록 |
| POST | `/api/posts` | 게시글 작성 |
| PUT | `/api/posts/:id` | 게시글 수정 |
| DELETE | `/api/posts/:id` | 게시글 삭제 |

## Supabase 설정

1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행
3. API 키 확인 (URL + Secret key)

## 로컬 실행

```bash
npm install
cp .env.example .env
# .env에 SUPABASE_URL, SUPABASE_SECRET_KEY 입력
npm run dev
```

## 환경변수

| 이름 | 설명 |
|------|------|
| `SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_SECRET_KEY` | 서버용 Secret key (브라우저에 노출 금지) |
| `ALLOWED_ORIGIN` | CORS 허용 origin (예: `http://localhost:5173`) |

## 프론트엔드 연결

프론트엔드 저장소: `card-board-frontend`

연결 가이드: [`CONNECTION.md`](./CONNECTION.md)

프론트 `.env`:

```text
VITE_API_BASE_URL=http://localhost:3000
```

## 배포 (Vercel)

1. 이 저장소를 Vercel에 연결
2. 환경변수 3개 등록
3. 배포 URL을 프론트 `VITE_API_BASE_URL`에 설정
