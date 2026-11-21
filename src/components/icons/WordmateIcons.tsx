import history18 from '@/assets/icons/history-18.svg'
import logout18 from '@/assets/icons/logout-18.svg'
import profile18 from '@/assets/icons/profile-18.svg'
import todaySentence18 from '@/assets/icons/today-sentence-18.svg'
import wrongNotes18 from '@/assets/icons/wrong-notes-18.svg'
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
import wrongNotes24 from '@/assets/icons/wrong-notes-24.svg'
import streakFire from '@/assets/streak-fire.png'
import trophy22 from '@/assets/icons/trophy-22.svg'
import vocabularyBook22 from '@/assets/icons/vocabulary-book-22.svg'
import volume18 from '@/assets/icons/volume-18.svg'

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

export function AvatarIcon() {
  return <img src={avatar19} alt="" aria-hidden="true" width={19} height={19} />
}

export function AvatarSmallIcon() {
  return <img src={avatar17} alt="" aria-hidden="true" width={17} height={17} />
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

export function LevelBadgeIcon() {
  return <img src={levelBadge16} alt="" aria-hidden="true" width={16} height={16} />
}

export function NotificationIcon() {
  return <img src={notification22} alt="" aria-hidden="true" width={22} height={22} />
}

export function RankUpIcon() {
  return <img src={rankUp18} alt="" aria-hidden="true" width={18} height={18} />
}

export function ReviewBookIcon() {
  return <img src={reviewBook24} alt="" aria-hidden="true" width={24} height={24} />
}

export function WrongNotesIcon() {
  return <img src={wrongNotes24} alt="" aria-hidden="true" width={24} height={24} />
}

export function StreakFire() {
  return <img src={streakFire} alt="" aria-hidden="true" width={18} height={18} />
}

export function VolumeIcon() {
  return <img src={volume18} alt="" aria-hidden="true" width={18} height={18} />
}

export function VocabularyBookIcon() {
  return <img src={vocabularyBook22} alt="" aria-hidden="true" width={22} height={22} />
}

export function LightningIcon() {
  return <img src={lightning22} alt="" aria-hidden="true" width={22} height={22} />
}

export function TrophyIcon() {
  return <img src={trophy22} alt="" aria-hidden="true" width={22} height={22} />
}

export function HistoryIcon() {
  return <img src={history18} alt="" aria-hidden="true" width={18} height={18} />
}

export function ProfileIcon() {
  return <img src={profile18} alt="" aria-hidden="true" width={18} height={18} />
}

export function WrongNotesSmallIcon() {
  return <ClippedIcon src={wrongNotes18} size={18} inset="8.33%" />
}

export function TodaySentenceIcon() {
  return <ClippedIcon src={todaySentence18} size={18} inset="1.35% 1.33% 1.34% 1.33%" />
}

export function LogoutIcon() {
  return (
    <span className="relative block size-[18px] overflow-clip">
      <span className="absolute" style={{ inset: '15.08% 12.15% 14.99% 9.16%' }}>
        <span className="absolute" style={{ inset: '-6.55% -5.82%' }}>
          <img src={logout18} alt="" className="absolute inset-0 size-full" />
        </span>
      </span>
    </span>
  )
}
