import arrowLeft22 from '@/assets/icons/arrow-left-22.svg'
import brandLockup from '@/assets/brand-lockup.svg'
import check14 from '@/assets/icons/check-14.svg'
import chevronRight18 from '@/assets/icons/chevron-right-18.svg'
import lightning22 from '@/assets/icons/lightning-22.svg'
import login16 from '@/assets/icons/login-16.svg'
import trophy22 from '@/assets/icons/trophy-22.svg'
import vocabularyBookCover from '@/assets/icons/vocabulary-book-22-cover.svg'
import vocabularyBookMask from '@/assets/icons/vocabulary-book-22-mask.svg'
import vocabularyBookMasked from '@/assets/icons/vocabulary-book-22-masked.svg'
import vocabularyBookVector from '@/assets/icons/vocabulary-book-22-vector.svg'
import volumeBody from '@/assets/icons/volume-18-body.svg'
import volumeWaves from '@/assets/icons/volume-18-waves.svg'

export function BrandLockup() {
  return <img src={brandLockup} alt="wordmate" width={121.952} height={19.11} />
}

export function ArrowLeftIcon() {
  return <img src={arrowLeft22} alt="" aria-hidden="true" width={22} height={22} />
}

export function ChevronRightIcon() {
  return <img src={chevronRight18} alt="" aria-hidden="true" width={18} height={18} />
}

export function CheckIcon() {
  return <img src={check14} alt="" aria-hidden="true" width={14} height={14} />
}

export function LoginIcon() {
  return <img src={login16} alt="" aria-hidden="true" width={16} height={16} />
}

function ClippedIcon({ src, size, inset }: { src: string; size: number; inset: string }) {
  return (
    <span className="relative block overflow-clip" style={{ width: size, height: size }}>
      <span className="absolute" style={{ inset }}>
        <img src={src} alt="" className="absolute inset-0 size-full" />
      </span>
    </span>
  )
}

export function VolumeIcon() {
  return (
    <span className="relative block size-[18px] overflow-clip">
      <span className="absolute" style={{ inset: '10.39% 36.59% 10.46% 3.25%' }}>
        <img src={volumeBody} alt="" className="absolute inset-0 size-full" />
      </span>
      <span className="absolute" style={{ inset: '27.3% 7.38% 26.87% 74.04%' }}>
        <span className="absolute" style={{ inset: '-9.09% -22.42%' }}>
          <img src={volumeWaves} alt="" className="absolute inset-0 size-full" />
        </span>
      </span>
    </span>
  )
}

export function VocabularyBookIcon() {
  return (
    <span className="relative block size-[22px] overflow-clip">
      <span className="absolute" style={{ inset: '19.84% 19.77% 9.08% 31.76%' }}>
        <img src={vocabularyBookVector} alt="" className="absolute inset-0 size-full" />
      </span>
      <span
        className="absolute mask-intersect mask-luminance mask-size-[15.993px_17.871px] mask-no-clip mask-position-[-6.997px_-3.352px] mask-no-repeat"
        style={{ inset: '30% 39.45% 59.85% 51.46%', maskImage: `url("${vocabularyBookMask}")` }}
      >
        <img src={vocabularyBookMasked} alt="" className="absolute inset-0 size-full" />
      </span>
      <span className="absolute" style={{ inset: '8% 28.86% 20.92% 22.68%' }}>
        <img src={vocabularyBookCover} alt="" className="absolute inset-0 size-full" />
      </span>
    </span>
  )
}

export function LightningIcon() {
  return <ClippedIcon src={lightning22} size={22} inset="4% 17.53% 4% 17.52%" />
}

export function TrophyIcon() {
  return <ClippedIcon src={trophy22} size={22} inset="8.29% 8.08% 8.33% 8.08%" />
}
