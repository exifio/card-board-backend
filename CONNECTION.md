# 프론트엔드 ↔ 백엔드 연결 가이드

프론트엔드와 백엔드는 **각각 독립 저장소**로 완성되어 있습니다.  
아래 순서대로 설정하면 서로 연결됩니다.

---

## 1. 저장소

| 역할 | 저장소 |
|------|--------|
| 프론트엔드 | https://github.com/exifio/card-board-frontend |
| 백엔드 | https://github.com/exifio/card-board-backend |

---

## 2. 백엔드 준비 (Supabase + API)

### 2-1. Supabase

1. Supabase 프로젝트 생성
2. `supabase/schema.sql`을 SQL Editor에서 실행
3. Project Settings → API에서 URL과 **Secret key** 확인

### 2-2. 백엔드 환경변수

`.env` 파일:

```text
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SECRET_KEY=your-secret-key
ALLOWED_ORIGIN=http://localhost:5173
```

### 2-3. 백엔드 실행

```bash
npm install
npm run dev
```

기본 주소: `http://localhost:3000`

### 2-4. API 확인

```bash
curl http://localhost:3000/api/posts
```

---

## 3. 프론트엔드 연결

프론트 `.env` 파일:

```text
VITE_API_BASE_URL=http://localhost:3000
```

`.env`가 **없으면** **로컬 모드**(localStorage)로 동작합니다.

---

## 4. API 규격

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/posts` | 목록 (최신순) |
| POST | `/api/posts` | 작성 `{ title, content }` |
| PUT | `/api/posts/:id` | 수정 |
| DELETE | `/api/posts/:id` | 삭제 |

---

## 5. Vercel 배포 후

**백엔드:** `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `ALLOWED_ORIGIN`  
**프론트:** `VITE_API_BASE_URL=https://your-backend.vercel.app`

---

## 6. 독립 개발 모드

| 모드 | 조건 | 데이터 저장 |
|------|------|-------------|
| 로컬 모드 | `VITE_API_BASE_URL` 없음 | localStorage |
| API 모드 | `VITE_API_BASE_URL` 설정 | Supabase |
