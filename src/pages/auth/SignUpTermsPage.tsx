import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon, ChevronRightIcon } from '@/components/icons/WordmateIcons'

const termsItems = [
  { id: 'service', label: '[필수] 서비스 이용약관', required: true },
  { id: 'privacy', label: '[필수] 개인정보 수집·이용 동의', required: true },
  { id: 'marketing', label: '[선택] 마케팅 정보 수신', required: false },
]

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${
        checked ? 'bg-brand border-brand' : 'border-border-input'
      }`}
    >
      {checked && <CheckIcon />}
    </span>
  )
}

export default function SignUpTermsPage({ userName = '한국' }: { userName?: string }) {
  const navigate = useNavigate()
  const [agreedIds, setAgreedIds] = useState<string[]>([])

  const allAgreed = agreedIds.length === termsItems.length
  const requiredAgreed = termsItems
    .filter((item) => item.required)
    .every((item) => agreedIds.includes(item.id))

  const toggleAll = () => setAgreedIds(allAgreed ? [] : termsItems.map((item) => item.id))

  const toggle = (id: string) =>
    setAgreedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))

  return (
    <div className="bg-background flex min-h-dvh flex-col items-center">
      <div className="flex w-full max-w-[560px] flex-col px-5 pt-12 pb-8">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(-1)}
          className="hover:bg-background-subtle -ml-2 flex size-10 shrink-0 items-center justify-center rounded-md"
        >
          <ArrowLeftIcon />
        </button>

        <h1 className="text-content pt-2 text-[26px] leading-[33.8px] font-extrabold tracking-[-0.78px]">
          {userName}님, 환영해요!
          <br />
          약관에 동의해 주세요
        </h1>

        <div className="pt-7">
          <button
            type="button"
            aria-pressed={allAgreed}
            onClick={toggleAll}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-[18px] text-left ${
              allAgreed ? 'bg-background-disabled' : 'bg-background-card'
            }`}
          >
            <Checkbox checked={allAgreed} />
            <span className="text-content text-base leading-6 font-extrabold">전체 동의하기</span>
          </button>
        </div>

        <ul className="px-3 py-2">
          {termsItems.map((item) => {
            const checked = agreedIds.includes(item.id)

            return (
              <li key={item.id} className="flex items-center">
                <button
                  type="button"
                  aria-pressed={checked}
                  onClick={() => toggle(item.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 px-1 py-3.5 text-left"
                >
                  <Checkbox checked={checked} />
                  <span className="text-content text-[15px] leading-[22.5px] font-semibold">
                    {item.label}
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  aria-label={`${item.label} 전문 보기`}
                  className="flex size-10 shrink-0 items-center justify-center rounded-md"
                >
                  <ChevronRightIcon />
                </button>
              </li>
            )
          })}
        </ul>

        <div className="min-h-20 pt-6">
          <button
            type="button"
            disabled={!requiredAgreed}
            className="bg-brand text-content-on-accent enabled:hover:bg-brand-strong disabled:bg-background-disabled disabled:text-content-muted flex h-14 w-full items-center justify-center gap-2 rounded-md px-5 text-base leading-6 font-bold"
          >
            동의하고 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
