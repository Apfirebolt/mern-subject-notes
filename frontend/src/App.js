import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HomePage from './pages/Home'
import LoginPage from './pages/auth/Login'
import RegisterPage from './pages/auth/Register'
import ListSubjectPage from './pages/subjects/List'
import AddSubjectPage from './pages/subjects/Add'
   
const App = () => {
  return (
    <Router>
      <Header />
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/subjects' component={ListSubjectPage} exact />
        <Route path='/subjects/add' component={AddSubjectPage} exact />
      <Footer />
    </Router>
  )
}
   
export default App;

