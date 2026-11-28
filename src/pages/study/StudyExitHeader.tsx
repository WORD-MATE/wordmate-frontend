import { Link } from 'react-router-dom'
import { CloseIcon } from '@/components/icons/WordmateIcons'
import { paths } from '@/routes/paths'

export default function StudyExitHeader() {
  return (
    <header className="flex h-18 items-center px-5 sm:px-8">
      <Link
        to={paths.home}
        aria-label="홈으로"
        className="hover:bg-background-subtle flex size-10 shrink-0 items-center justify-center rounded-md"
      >
        <CloseIcon />
      </Link>
    </header>
  )
}
