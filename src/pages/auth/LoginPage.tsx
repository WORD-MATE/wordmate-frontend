import {
  BrandLockup,
  LightningIcon,
  LoginIcon,
  TrophyIcon,
  VocabularyBookIcon,
  VolumeIcon,
} from '@/components/icons/WordmateIcons'

const highlight =
  'linear-gradient(180deg, rgba(0,0,0,0) 60%, #b6e02a 60%, #b6e02a 80%, rgba(0,0,0,0) 80%)'

const definitions = [
  {
    term: '짝, 친구',
    description: '같은 반 친구와 함께 외우는 단어 짝꿍',
    example: '수능·교과서·IT 단어팩과 오답노트',
  },
  {
    term: '외통수',
    description: '실시간 대결에서 승부를 끝내는 마지막 한 수',
    example: '반 친구 최대 30명과 동시에',
  },
  {
    term: '동료',
    description: '학교·학년·반 랭킹을 함께 오르는 사이',
    example: '매주 새로 시작하는 주간 랭킹',
  },
]

const features = [
  {
    Icon: VocabularyBookIcon,
    title: '단어팩 학습',
    description: '수능·교과서·IT 단어팩과 오답노트',
  },
  {
    Icon: LightningIcon,
    title: '실시간 단어 대결',
    description: '반 친구 최대 30명과 동시에',
  },
  {
    Icon: TrophyIcon,
    title: '주간 랭킹',
    description: '학교·학년·반별 순위 경쟁',
  },
]

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-dvh flex-col lg:flex-row lg:p-4">
      <section className="bg-background-card relative flex min-h-dvh min-w-0 flex-1 items-center overflow-clip rounded-none px-6 pt-20 pb-28 lg:min-h-0 lg:rounded-lg lg:px-14 lg:pt-24 lg:pb-14">
        <header className="absolute top-3 left-6 lg:top-7 lg:left-10">
          <BrandLockup />
        </header>

        <div className="flex min-w-0 flex-1 justify-center">
          <div className="w-[560px] max-w-full">
            <p className="text-content-muted hidden text-[13px] leading-[19.5px] font-bold tracking-[0.26px] lg:block">
              WORD MATE 사전 · 오늘의 단어
            </p>

            <div className="pt-6 pb-[18px]">
              <p
                className="text-content inline-block text-[100px] leading-none font-extrabold tracking-[-0.05em] lg:text-[clamp(5rem,11vw,11rem)]"
                style={{ backgroundImage: highlight }}
              >
                <span className="sr-only">mate</span>
                <span aria-hidden="true">
                  <span className="login-wordmark-letter login-wordmark-letter-1">m</span>
                  <span className="login-wordmark-letter login-wordmark-letter-2">a</span>
                  <span className="login-wordmark-letter login-wordmark-letter-3">t</span>
                  <span className="login-wordmark-letter login-wordmark-letter-4">e</span>
                  <span className="login-wordmark-caret" />
                </span>
              </p>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <VolumeIcon />
              <span className="text-content-secondary text-[17px] leading-[25.5px] font-semibold tracking-[-0.15px]">
                /meɪt/
              </span>
              <span className="bg-background-disabled text-content-secondary rounded-xs px-1.5 py-0.5 text-xs leading-[18px] font-bold tracking-[-0.15px]">
                명사
              </span>
            </div>

            <ol aria-label="단어 뜻 예시" className="hidden flex-col gap-6 pt-11 lg:flex">
              {definitions.map((definition, index) => (
                <li key={definition.term} className="flex gap-3.5">
                  <span className="bg-content text-background mt-px flex size-6 shrink-0 items-center justify-center rounded-sm text-[13px] leading-[19.5px] font-extrabold tracking-[-0.15px]">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-content text-[18px] leading-[27px] font-extrabold tracking-[-0.15px]">
                      {definition.term}
                    </p>
                    <p className="text-content-secondary pt-0.5 text-[15px] leading-[22.5px] tracking-[-0.15px]">
                      {definition.description}
                    </p>
                    <p className="text-content-muted pt-1 text-xs leading-[18px] tracking-[-0.15px]">
                      <span className="font-bold">예) </span>
                      {definition.example}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <h1 className="text-content mt-6 text-[24px] leading-[31px] font-extrabold tracking-[-0.96px] break-keep lg:hidden">
              매일 10분,
              <br />
              단어로{' '}
              <span style={{ backgroundImage: highlight }} className="inline-block">
                겨루고
              </span>{' '}
              성장하기
            </h1>
          </div>
        </div>
      </section>

      <section className="contents lg:mx-0 lg:mr-[clamp(1rem,11.56vw,185px)] lg:ml-[clamp(1rem,12.56vw,201px)] lg:flex lg:w-[min(480px,35vw)] lg:max-w-none lg:shrink-0 lg:flex-col lg:justify-center lg:gap-9 lg:px-8 lg:py-12">
        <h1 className="text-content hidden text-[42px] leading-[53.76px] font-extrabold tracking-[-1.68px] break-keep lg:block">
          매일 10분,
          <br />
          단어로{' '}
          <span style={{ backgroundImage: highlight }} className="inline-block">
            겨루고
          </span>{' '}
          성장하기
        </h1>

        <ul className="hidden flex-col gap-3.5 lg:flex">
          {features.map(({ Icon, title, description }) => (
            <li key={title} className="flex items-center gap-3.5">
              <span className="bg-content/7 flex size-11 shrink-0 items-center justify-center rounded-lg">
                <Icon />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="text-content text-[15px] leading-[22.5px] font-bold tracking-[-0.15px]">
                  {title}
                </p>
                <p className="text-content-muted text-[13px] leading-[19.5px] tracking-[-0.15px]">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="bg-background-subtle text-content hover:bg-background-disabled fixed right-6 bottom-6 left-6 z-20 flex h-14 items-center justify-center gap-2 rounded-md px-5 text-base leading-6 font-bold lg:static lg:w-full lg:max-w-[416px]"
        >
          <LoginIcon />
          DataGSM으로 로그인
        </button>
      </section>
    </div>
  )
}
