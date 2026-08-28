# Card Board Backend

카드 게시판 REST API 서버입니다.

## 기술 스택

- TypeScript
- Vercel Serverless Functions
- Supabase (추후 연결)

## API

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/posts` | 게시글 목록 (준비 중) |
| POST | `/api/posts` | 게시글 작성 (준비 중) |
| PUT | `/api/posts/:id` | 게시글 수정 (준비 중) |
| DELETE | `/api/posts/:id` | 게시글 삭제 (준비 중) |

## 로컬 실행

```bash
npm install
cp .env.example .env
npm run dev
```

## 환경변수

`.env` 파일에 아래 값을 설정합니다.

```text
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

`SUPABASE_SECRET_KEY`는 서버에서만 사용합니다. React 코드나 `VITE_` 환경변수에 넣지 마세요.
