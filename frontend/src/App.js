import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import PrivateRoute from './components/common/ProtectedRoute';
import HomePage from './pages/Home'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import ListSubjectPage from './pages/subjects/List'
import AddSubjectPage from './pages/subjects/Add'
import UpdateSubjectPage from './pages/subjects/Update'
import DetailSubjectPage from './pages/subjects/Detail'
import DetailTopicPage from './pages/topics/Detail'
   
const App = () => {
  return (
    <Router>
      <Header />
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <PrivateRoute path='/subjects/add' component={AddSubjectPage} exact />
        <PrivateRoute path='/subjects' component={ListSubjectPage} exact />
        <PrivateRoute path='/subjects/:id/detail' component={DetailSubjectPage} exact />
        <PrivateRoute path='/subjects/:id/update' component={UpdateSubjectPage} exact />
        <PrivateRoute path='/subjects/:id/topics/:topicId' component={DetailTopicPage} exact />
      <Footer />
    </Router>
  )
}
   
export default App;

