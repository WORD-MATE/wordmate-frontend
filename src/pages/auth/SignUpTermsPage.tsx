import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, CheckIcon, ChevronRightIcon } from '@/components/icons/WordmateIcons'
import { paths } from '@/routes/paths'

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

export default function SignUpTermsPage({ userName }: { userName?: string }) {
  const navigate = useNavigate()
  const [agreedIds, setAgreedIds] = useState<string[]>([])
  const [marketingTermsOpen, setMarketingTermsOpen] = useState(false)

  const allAgreed = agreedIds.length === termsItems.length
  const requiredAgreed = termsItems
    .filter((item) => item.required)
    .every((item) => agreedIds.includes(item.id))

  const toggleAll = () => setAgreedIds(allAgreed ? [] : termsItems.map((item) => item.id))

  const toggle = (id: string) =>
    setAgreedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))

  return (
    <div className="bg-background flex min-h-dvh flex-col items-center">
      <div className="flex min-h-dvh w-full max-w-[560px] flex-col px-6 pt-3 pb-[120px] sm:min-h-0 sm:px-5 sm:pt-12 sm:pb-8">
        <button
          type="button"
          aria-label="뒤로 가기"
          onClick={() => navigate(paths.login)}
          className="hover:bg-background-subtle -ml-2 flex size-10 shrink-0 items-center justify-center rounded-md"
        >
          <ArrowLeftIcon />
        </button>

        <h1 className="text-content pt-0 text-[26px] leading-[33.8px] font-extrabold tracking-[-0.78px] sm:pt-2">
          {userName ? `${userName}님, ` : ''}환영해요!
          <br />
          약관에 동의해 주세요
        </h1>

        <div className="pt-7">
          <button
            type="button"
            role="checkbox"
            aria-checked={allAgreed}
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
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggle(item.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 px-1 py-3.5 text-left"
                >
                  <Checkbox checked={checked} />
                  <span className="text-content text-[15px] leading-[22.5px] font-semibold">
                    {item.label}
                  </span>
                </button>
                {item.id === 'marketing' && (
                  <button
                    type="button"
                    aria-label={`${item.label} 전문 보기`}
                    onClick={() => setMarketingTermsOpen(true)}
                    className="flex size-10 shrink-0 items-center justify-center rounded-md"
                  >
                    <ChevronRightIcon />
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        <div className="min-h-20 pt-6">
          <button
            type="button"
            disabled={!requiredAgreed}
            className="bg-brand text-content-on-accent enabled:hover:bg-brand-strong disabled:bg-background-disabled disabled:text-content-muted fixed right-6 bottom-[calc(env(safe-area-inset-bottom)+16px)] left-6 z-20 flex h-14 items-center justify-center gap-2 rounded-md px-5 text-base leading-6 font-bold sm:static sm:w-full"
          >
            동의하고 시작하기
          </button>
        </div>
      </div>

      {marketingTermsOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 sm:items-center sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="marketing-terms-title"
            className="bg-background w-full max-w-[480px] rounded-t-xl p-6 sm:rounded-xl"
          >
            <h2 id="marketing-terms-title" className="text-content text-lg font-extrabold">
              마케팅 정보 수신 동의
            </h2>
            <p className="text-content-secondary mt-4 text-sm leading-6">
              워드메이트의 새 기능, 이벤트와 혜택 안내를 받을 수 있습니다. 동의는 선택 사항이며
              언제든지 철회할 수 있습니다.
            </p>
            <button
              type="button"
              onClick={() => setMarketingTermsOpen(false)}
              className="bg-brand mt-6 flex h-12 w-full items-center justify-center rounded-md font-bold"
            >
              확인
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
