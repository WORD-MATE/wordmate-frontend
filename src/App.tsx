import { Route, Routes } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/HomePage'
import { paths } from '@/routes/paths'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={paths.home} element={<HomePage />} />
        <Route path="*" />
      </Route>
    </Routes>
  )
}
