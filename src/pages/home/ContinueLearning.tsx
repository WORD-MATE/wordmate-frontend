import { ArrowRightAltIcon, ChevronRight20Icon } from '@/components/icons/WordmateIcons'
import { Link } from 'react-router-dom'
import { paths } from '@/routes/paths'

export default function ContinueLearning() {
  return (
    <section>
      <div className="flex items-end justify-between">
        <h2 className="text-content text-[18px] leading-[27px] font-bold tracking-[-0.36px]">
          이어서 학습
        </h2>
        <Link to={paths.wordPacks} className="flex items-center gap-0.5">
          <span className="text-content-muted text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]">
            전체 단어팩
          </span>
          <ArrowRightAltIcon />
        </Link>
      </div>

      <div className="pt-3.5">
        <button
          type="button"
          className="bg-background-card flex w-full flex-col gap-4 rounded-lg p-5 text-left"
        >
          <span className="flex w-full items-center gap-3">
            <span className="flex flex-1 flex-col gap-1">
              <span className="text-content text-[18px] leading-[27px] font-extrabold tracking-[-0.36px]">
                수능 필수 영단어 Day 12
              </span>
              <span className="text-content-secondary text-[13px] leading-[19.5px] tracking-[-0.15px]">
                기본 단어팩 · 4지선다 · 영→한 · 12번부터
              </span>
            </span>
            <ChevronRight20Icon />
          </span>

          <span className="flex w-full items-center gap-3">
            <span className="bg-background-disabled h-1 flex-1 overflow-clip rounded-xs">
              <span className="bg-brand block h-1" style={{ width: '58%' }} />
            </span>
            <span className="text-content text-[13px] leading-[19.5px] font-bold tracking-[-0.15px]">
              14<span className="text-content-muted font-normal"> / 24</span>
            </span>
          </span>
        </button>
      </div>
    </section>
  )
}
