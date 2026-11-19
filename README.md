# WORD MATE Frontend

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?logo=vitest&logoColor=white)
[![CI](https://github.com/WORD-MATE/wordmate-frontend/actions/workflows/ci.yml/badge.svg?branch=dev)](https://github.com/WORD-MATE/wordmate-frontend/actions/workflows/ci.yml)

단어 학습 서비스 WORD MATE의 웹 프론트엔드입니다.

## 기술 스택

| 구분         | 기술                    |
| ------------ | ----------------------- |
| Framework    | React                   |
| Language     | TypeScript              |
| Build Tool   | Vite                    |
| Styling      | Tailwind CSS            |
| Routing      | React Router            |
| HTTP Client  | Axios                   |
| Server State | TanStack Query          |
| Linting      | ESLint                  |
| Formatting   | Prettier                |
| Testing      | Vitest, Testing Library |
| CI           | GitHub Actions          |

## 실행 방법

```bash
npm install
npm run dev
```

| 스크립트               | 설명               |
| ---------------------- | ------------------ |
| `npm run dev`          | 개발 서버 실행     |
| `npm run build`        | 프로덕션 빌드      |
| `npm run preview`      | 빌드 결과 미리보기 |
| `npm run typecheck`    | 타입 검사          |
| `npm run lint`         | ESLint 검사        |
| `npm run format`       | Prettier 포맷 적용 |
| `npm run format:check` | Prettier 포맷 검사 |
| `npm test`             | 테스트 실행        |

## 환경변수

`.env.example`을 복사해 `.env`를 만들고 값을 채웁니다.

```bash
cp .env.example .env
```

| 이름                | 설명          |
| ------------------- | ------------- |
| `VITE_API_BASE_URL` | API 서버 주소 |

## 브랜치 전략

| 브랜치       | 용도                |
| ------------ | ------------------- |
| `main`       | 최종 배포           |
| `dev`        | 개발 통합           |
| `feature/*`  | 새로운 기능 개발    |
| `fix/*`      | 버그 수정           |
| `design/*`   | UI 및 디자인 작업   |
| `refactor/*` | 코드 리팩토링       |
| `release/*`  | 출시 준비           |
| `hotfix/*`   | 배포 이후 긴급 수정 |

모든 개발 작업은 `dev`를 기준으로 브랜치를 만들고, `dev`를 대상으로 PR을 생성합니다.

브랜치 이름은 `type/{작업내용}` 형식을 사용합니다. (예: `feature/login-page`)

## Commit Convention

`type :: 작업내용 #이슈번호`

```
feat :: 로그인 페이지 구현 #12
fix :: 로그인 응답 처리 오류 수정 #12
```

| Type       | 설명                          |
| ---------- | ----------------------------- |
| `feat`     | 새로운 기능 추가              |
| `fix`      | 오류 수정                     |
| `design`   | 디자인 요소 변경              |
| `style`    | 코드 스타일 변경              |
| `refactor` | 기능 변경 없는 코드 구조 개선 |
| `docs`     | 문서 수정                     |
| `revert`   | 이전 커밋 되돌리기            |
| `test`     | 테스트 코드 추가 및 수정      |
| `chore`    | 기타 작업                     |

## Issue 및 PR 규칙

모든 개발 작업은 Issue를 먼저 생성합니다.

- Issue 제목: `[type] 작업 내용`
- PR 제목: `[type/#이슈번호] 작업 내용`

PR은 `dev`를 대상으로 생성하고, 관련 Issue와 Label을 연결합니다. 머지는 리뷰 후 진행합니다.
