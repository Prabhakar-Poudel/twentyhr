import {  Route } from 'react-router-dom'
import EditorPage from 'src/pages/editor/EditorPage'
import DashboardPage from 'src/pages/dashboard/DashboardPage'
import NotFoundPage from 'src/pages/NotFoundPage'
import QuestionsHome from 'src/pages/question/QuestionsHome'
import AdminHome from 'src/pages/admin/AdminHome'


const AuthenticatedRoute = () => {
  return (
    <Route>
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/questions" element={<QuestionsHome />} />
      <Route path="/admin/*" element={<AdminHome />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
}

export default AuthenticatedRoute
