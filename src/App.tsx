import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/auth/LoginPage'
import SignUpTermsPage from '@/pages/auth/SignUpTermsPage'
import HomePage from '@/pages/home/HomePage'
import FlashcardStudyPage from '@/pages/study/flashcards/FlashcardStudyPage'
import MultipleChoiceStudyPage from '@/pages/study/multiple-choice/MultipleChoiceStudyPage'
import StudySettingsPage from '@/pages/study/StudySettingsPage'
import TypingStudyPage from '@/pages/study/typing/TypingStudyPage'
import WordPackDetailPage from '@/pages/word-packs/WordPackDetailPage'
import WordPacksPage from '@/pages/word-packs/WordPacksPage'
import { paths } from '@/routes/paths'

export default function App() {
  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.signUpTerms} element={<SignUpTermsPage />} />
      <Route path={paths.flashcardStudy} element={<FlashcardStudyPage />} />
      <Route path={paths.multipleChoiceStudy} element={<MultipleChoiceStudyPage />} />
      <Route path={paths.typingStudy} element={<TypingStudyPage />} />
      <Route element={<AppLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.wordPacks} element={<WordPacksPage />} />
        <Route path={paths.wordPackDetail} element={<WordPackDetailPage />} />
        <Route path={paths.studySettings} element={<StudySettingsPage />} />
        <Route path="*" />
      </Route>
    </Routes>
  )
}
