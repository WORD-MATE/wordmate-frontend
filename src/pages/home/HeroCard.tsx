import { ChevronRightAltIcon, StreakFire } from '@/components/icons/WordmateIcons'

const wordCards = [
  { word: 'repeat', rotation: '-rotate-9', tone: 'border-white/60 bg-white/35', left: 70, top: 0 },
  { word: 'shape', rotation: '-rotate-3', tone: 'border-white/60 bg-white/50', left: 104, top: 14 },
]

export default function HeroCard() {
  return (
    <section
      className="relative grid grid-cols-[718px_320px] gap-6 overflow-clip rounded-lg p-12"
      style={{
        backgroundImage: 'linear-gradient(151.37deg, #b6e02a 8.49%, #5ee6c4 91.51%)',
      }}
    >
      <div className="flex flex-col self-center">
        <p className="flex items-center gap-1.5 text-[13px] leading-[19.5px] tracking-[-0.15px] text-[rgba(11,12,14,0.65)]">
          <StreakFire />
          <span className="font-semibold">연속 학습</span>
          <span className="font-black">7</span>
          <span className="font-semibold">일째</span>
        </p>

        <h1 className="pt-2.5 text-[36px] leading-[46.8px] font-extrabold tracking-[-1.26px] text-[#0b0c0e]">
          한국님, 오늘도
          <br />
          단어{' '}
          <span
            className="inline-block"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(0,0,0,0) 58%, rgba(255,255,255,0.65) 58%)',
            }}
          >
            10개
          </span>
          만 해볼까요?
        </h1>

        <div className="flex gap-2 pt-[22px]">
          <button
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-md bg-[#0b0c0e] px-5 text-[15px] leading-[22.5px] font-bold tracking-[-0.15px] text-white"
          >
            학습하기
            <ChevronRightAltIcon />
          </button>
          <button
            type="button"
            className="flex h-12 items-center justify-center rounded-md bg-white/50 px-5 text-[15px] leading-[22.5px] font-bold tracking-[-0.15px] text-[#0b0c0e]"
          >
            대결하기
          </button>
        </div>
      </div>

      <div className="relative h-[190px] self-center" aria-hidden="true">
        {wordCards.map(({ word, rotation, tone, left, top }) => (
          <div
            key={word}
            className={`absolute flex h-[120px] w-[180px] flex-col justify-end rounded-md border p-3.5 ${rotation} ${tone}`}
            style={{ left, top }}
          >
            <p className="text-[15px] leading-[22.5px] font-bold tracking-[-0.15px] text-[rgba(11,12,14,0.4)]">
              {word}
            </p>
          </div>
        ))}

        <div className="absolute top-[34px] left-[140px] flex h-[120px] w-[180px] rotate-5 flex-col justify-end rounded-md border border-white bg-white p-3.5 drop-shadow-[0px_16px_20px_rgba(11,12,14,0.14)]">
          <p className="flex-1 text-[11px] leading-[16.5px] font-bold tracking-[-0.15px] text-[#0b0c0e] opacity-60">
            오늘의 단어
          </p>
          <p className="text-[32px] leading-[35.2px] font-black tracking-[-0.96px] text-[#0b0c0e]">
            habit
          </p>
          <p className="text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px] text-[#0b0c0e]">
            습관
          </p>
        </div>
      </div>
    </section>
  )
}
