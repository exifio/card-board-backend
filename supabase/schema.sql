-- Supabase SQL Editor에서 실행하세요.

create table if not exists posts (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 테스트 데이터 (선택)
insert into posts (title, content)
values
  ('첫 번째 게시글', '풀스택 실습을 시작합니다.'),
  ('두 번째 게시글', 'REST API와 Supabase를 연결합니다.');
