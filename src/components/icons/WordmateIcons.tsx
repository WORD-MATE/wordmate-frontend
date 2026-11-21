import brandLockup from '@/assets/brand-lockup.svg'
import arrowLeft22 from '@/assets/icons/arrow-left-22.svg'
import arrowRight16Alt from '@/assets/icons/arrow-right-16-alt.svg'
import arrowRight16 from '@/assets/icons/arrow-right-16.svg'
import avatar17 from '@/assets/icons/avatar-17.svg'
import avatar19 from '@/assets/icons/avatar-19.svg'
import check14 from '@/assets/icons/check-14.svg'
import chevronDown16 from '@/assets/icons/chevron-down-16.svg'
import chevronRight18Alt from '@/assets/icons/chevron-right-18-alt.svg'
import chevronRight18 from '@/assets/icons/chevron-right-18.svg'
import chevronRight20 from '@/assets/icons/chevron-right-20.svg'
import levelBadge16 from '@/assets/icons/level-badge-16.svg'
import lightning22 from '@/assets/icons/lightning-22.svg'
import login16 from '@/assets/icons/login-16.svg'
import notification22 from '@/assets/icons/notification-22.svg'
import rankUp18 from '@/assets/icons/rank-up-18.svg'
import reviewBook24 from '@/assets/icons/review-book-24.svg'
import trophy22 from '@/assets/icons/trophy-22.svg'
import vocabularyBookCover from '@/assets/icons/vocabulary-book-22-cover.svg'
import vocabularyBookMask from '@/assets/icons/vocabulary-book-22-mask.svg'
import vocabularyBookMasked from '@/assets/icons/vocabulary-book-22-masked.svg'
import vocabularyBookVector from '@/assets/icons/vocabulary-book-22-vector.svg'
import volumeBody from '@/assets/icons/volume-18-body.svg'
import volumeWaves from '@/assets/icons/volume-18-waves.svg'
import wrongNotes24 from '@/assets/icons/wrong-notes-24.svg'
import streakFire from '@/assets/streak-fire.png'

export function BrandLockup() {
  return <img src={brandLockup} alt="wordmate" width={121.952} height={19.11} />
}

export function LoginIcon() {
  return <img src={login16} alt="" aria-hidden="true" width={16} height={16} />
}

export function ArrowLeftIcon() {
  return <img src={arrowLeft22} alt="" aria-hidden="true" width={22} height={22} />
}

export function ArrowRightIcon() {
  return <img src={arrowRight16} alt="" aria-hidden="true" width={16} height={16} />
}

export function ArrowRightAltIcon() {
  return <img src={arrowRight16Alt} alt="" aria-hidden="true" width={16} height={16} />
}

export function CheckIcon() {
  return <img src={check14} alt="" aria-hidden="true" width={14} height={14} />
}

export function ChevronDownIcon() {
  return <img src={chevronDown16} alt="" aria-hidden="true" width={16} height={16} />
}

export function ChevronRightIcon() {
  return <img src={chevronRight18} alt="" aria-hidden="true" width={18} height={18} />
}

export function ChevronRightAltIcon() {
  return <img src={chevronRight18Alt} alt="" aria-hidden="true" width={18} height={18} />
}

export function ChevronRight20Icon() {
  return <img src={chevronRight20} alt="" aria-hidden="true" width={20} height={20} />
}

export function NotificationIcon() {
  return <img src={notification22} alt="" aria-hidden="true" width={22} height={22} />
}

export function AvatarIcon() {
  return <img src={avatar19} alt="" aria-hidden="true" width={19} height={19} />
}

export function AvatarSmallIcon() {
  return <img src={avatar17} alt="" aria-hidden="true" width={17} height={17} />
}

export function RankUpIcon() {
  return <img src={rankUp18} alt="" aria-hidden="true" width={18} height={18} />
}

export function StreakFire() {
  return <img src={streakFire} alt="" aria-hidden="true" width={16} height={16} />
}

export function LevelBadgeIcon() {
  return (
    <span className="relative block size-[16px] overflow-clip">
      <img
        src={levelBadge16}
        alt=""
        className="absolute inset-[5.13%_16.67%_4.17%_16.67%] size-full"
      />
    </span>
  )
}

export function WrongNotesIcon() {
  return (
    <span className="relative block size-[24px] overflow-clip">
      <img src={wrongNotes24} alt="" className="absolute inset-[26.67%_3.95%] size-full" />
    </span>
  )
}

export function ReviewBookIcon() {
  return (
    <span className="relative block size-[24px] overflow-clip">
      <img src={reviewBook24} alt="" className="absolute inset-[7.5%_7.69%_7.5%_7.38%] size-full" />
    </span>
  )
}

export function LightningIcon() {
  return (
    <span className="relative block size-[22px] overflow-clip">
      <img src={lightning22} alt="" className="absolute inset-[4%_17.53%_4%_17.52%] size-full" />
    </span>
  )
}

export function TrophyIcon() {
  return (
    <span className="relative block size-[22px] overflow-clip">
      <img src={trophy22} alt="" className="absolute inset-[8.29%_8.08%_8.33%_8.08%] size-full" />
    </span>
  )
}

export function VolumeIcon() {
  return (
    <span className="relative block size-[18px] overflow-clip">
      <img
        src={volumeBody}
        alt=""
        className="absolute inset-[10.39%_36.59%_10.46%_3.25%] size-full"
      />
      <span className="absolute inset-[27.3%_7.38%_26.87%_74.04%]">
        <img src={volumeWaves} alt="" className="absolute inset-[-9.09%_-22.42%] size-full" />
      </span>
    </span>
  )
}

export function VocabularyBookIcon() {
  return (
    <span className="relative block size-[22px] overflow-clip">
      <img
        src={vocabularyBookVector}
        alt=""
        className="absolute inset-[19.84%_19.77%_9.08%_31.76%] size-full"
      />
      <span
        className="absolute inset-[30%_39.45%_59.85%_51.46%] mask-intersect mask-luminance mask-size-[15.993px_17.871px] mask-no-clip mask-position-[-6.997px_-3.352px] mask-no-repeat"
        style={{ maskImage: `url("${vocabularyBookMask}")` }}
      >
        <img src={vocabularyBookMasked} alt="" className="absolute inset-0 size-full" />
      </span>
      <img
        src={vocabularyBookCover}
        alt=""
        className="absolute inset-[8%_28.86%_20.92%_22.68%] size-full"
      />
    </span>
  )
}
