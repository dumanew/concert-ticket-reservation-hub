import React, {useState} from 'react'
import {Redirect, BrowserRouter, Switch, Route} from 'react-router-dom'
import {UserProvider} from './contexts/UserContext'

import AppNavbar from './components/AppNavbar.jsx'
import MenuPage from './pages/MenuPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ArtistCreatePage from './pages/ArtistCreatePage.jsx'
import EventCreatePage from './pages/EventCreatePage.jsx'
import EventDeletePage from './pages/EventDeletePage.jsx'
import CompanyCreatePage from './pages/CompanyCreatePage.jsx'
import GenreCreatePage from './pages/GenreCreatePage.jsx'
import VenueCreatePage from './pages/VenueCreatePage.jsx'

function App() {
  const [user, setUser] = useState({
    name: localStorage.getItem('name'),
    role: localStorage.getItem('role'),
    token: localStorage.getItem('token')
  })

  const unsetUser = () => {
    localStorage.clear()
    setUser({name: null, role: null, token: null})
  }

  const Load = (props, page) => {
    if (user.token === null) return <Redirect to='/login' />

    if (page === 'LogoutPage') {
      unsetUser()
      return <Redirect to='/login' />
    }

    switch (page) {
      case 'MenuPage': return <MenuPage {...props} />
      case 'DashboardPage': return <DashboardPage {...props} />
      case 'ArtistCreatePage': return <ArtistCreatePage {...props} />
      case 'EventCreatePage' : return <EventCreatePage {...props} />
      case 'EventDeletePage' : return <EventDeletePage {...props} />
      case 'CompanyCreatePage': return <CompanyCreatePage {...props} />
      case 'GenreCreatePage': return <GenreCreatePage {...props} />
      case 'VenueCreatePage': return <VenueCreatePage {...props} />
    }
  }
  
  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <BrowserRouter>
        <AppNavbar />

        <Switch>
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          {/*<Route exact path='/logout' render={(props) => Load(props, 'LogoutPage')} />*/}
          <Route exact path='/' render={(props) => Load(props, 'MenuPage')} />
          <Route exact path='/dashboard' render={(props) => Load(props, 'DashboardPage')} />
          <Route exact path='/event-create' render={(props) => Load(props, 'EventCreatePage')} />
          {/* <Route exact path='/event-edit/:id' component={RegisterPage} /> */}
          <Route exact path='/event-delete/:id' render={(props) => Load(props, 'EventDeletePage')}  />
          <Route exact path='/artist-create' render={(props) => Load(props, 'ArtistCreatePage')} />
          <Route exact path='/company-create' render={(props) => Load(props, 'CompanyCreatePage')} />
          <Route exact path='/genre-create' render={(props) => Load(props, 'GenreCreatePage')} />
          <Route exact path='/venue-create' render={(props) => Load(props, 'VenueCreatePage')} />
          {/* <Route exact path='/cart' component={RegisterPage} />
          <Route exact path='/transactions' component={RegisterPage} /> */}
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
