import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/auth/LoginPage'
import SignUpTermsPage from '@/pages/auth/SignUpTermsPage'
import HomePage from '@/pages/home/HomePage'
import { paths } from '@/routes/paths'

export default function App() {
  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path={paths.signUpTerms} element={<SignUpTermsPage />} />
      <Route element={<AppLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path="*" />
      </Route>
    </Routes>
  )
}
