import history18 from '@/assets/icons/history-18.svg'
import logout18 from '@/assets/icons/logout-18.svg'
import plus16 from '@/assets/icons/plus-16.svg'
import profile18 from '@/assets/icons/profile-18.svg'
import search18 from '@/assets/icons/search-18.svg'
import starFilled18 from '@/assets/icons/star-filled-18.svg'
import starOutline18 from '@/assets/icons/star-outline-18.svg'
import starSmall14 from '@/assets/icons/star-small-14.svg'
import todaySentence18 from '@/assets/icons/today-sentence-18.svg'
import wrongNotes18 from '@/assets/icons/wrong-notes-18.svg'
import brandLockup from '@/assets/brand-lockup.svg'
import arrowLeft22 from '@/assets/icons/arrow-left-22.svg'
import arrowRight16Alt from '@/assets/icons/arrow-right-16-alt.svg'
import arrowRight16 from '@/assets/icons/arrow-right-16.svg'
import avatar17 from '@/assets/icons/avatar-17.svg'
import avatar19 from '@/assets/icons/avatar-19.svg'
import check14 from '@/assets/icons/check-14.svg'
import close22 from '@/assets/icons/close-22.svg'
import flashcards24 from '@/assets/icons/flashcards-24.svg'
import keyboard24 from '@/assets/icons/keyboard-24.svg'
import multipleChoice24 from '@/assets/icons/multiple-choice-24.svg'
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

function BoxedIcon({ src, size }: { src: string; size: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <img src={src} alt="" aria-hidden="true" />
    </span>
  )
}

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
  return <img src={levelBadge16} alt="" aria-hidden="true" width={10.6667} height={14.512} />
}

export function NotificationIcon() {
  return <img src={notification22} alt="" aria-hidden="true" width={22} height={22} />
}

export function RankUpIcon() {
  return <img src={rankUp18} alt="" aria-hidden="true" width={18} height={18} />
}

export function ReviewBookIcon() {
  return <img src={reviewBook24} alt="" aria-hidden="true" width={20.384} height={20.3999} />
}

export function WrongNotesIcon() {
  return <img src={wrongNotes24} alt="" aria-hidden="true" width={22.1033} height={11.2} />
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
  return <BoxedIcon src={wrongNotes18} size={18} />
}

export function TodaySentenceIcon() {
  return <BoxedIcon src={todaySentence18} size={18} />
}

export function LogoutIcon() {
  return <BoxedIcon src={logout18} size={18} />
}

export function SearchIcon() {
  return <BoxedIcon src={search18} size={18} />
}

export function PlusIcon() {
  return <img src={plus16} alt="" aria-hidden="true" width={16} height={16} />
}

export function StarOutlineIcon() {
  return <img src={starOutline18} alt="" aria-hidden="true" width={18} height={18} />
}

export function StarFilledIcon() {
  return <img src={starFilled18} alt="" aria-hidden="true" width={18} height={18} />
}

export function StarSmallIcon() {
  return <img src={starSmall14} alt="" aria-hidden="true" width={14} height={14} />
}

export function FlashcardsIcon() {
  return <img src={flashcards24} alt="" aria-hidden="true" width={24} height={24} />
}

export function MultipleChoiceIcon() {
  return <img src={multipleChoice24} alt="" aria-hidden="true" width={24} height={24} />
}

export function KeyboardIcon() {
  return <img src={keyboard24} alt="" aria-hidden="true" width={24} height={24} />
}

export function CloseIcon() {
  return <BoxedIcon src={close22} size={22} />
}
