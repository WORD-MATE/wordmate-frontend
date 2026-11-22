import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/auth/LoginPage'
import SignUpTermsPage from '@/pages/auth/SignUpTermsPage'
import HomePage from '@/pages/home/HomePage'
import WordPackDetailPage from '@/pages/word-packs/WordPackDetailPage'
import WordPacksPage from '@/pages/word-packs/WordPacksPage'
import { paths } from '@/routes/paths'

export default function App() {
  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.signUpTerms} element={<SignUpTermsPage />} />
      <Route element={<AppLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path={paths.wordPacks} element={<WordPacksPage />} />
        <Route path={paths.wordPackDetail} element={<WordPackDetailPage />} />
        <Route path="*" />
      </Route>
    </Routes>
  )
}
