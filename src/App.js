import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';

import { MenuHeader } from "./components/MenuHeader/MenuHeader";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";

import HomePage from './routes/Home/Home';
import { GamePage } from './routes/Game/Game';
import { AboutPage } from "./routes/AboutPage/AboutPage";
import { ContactPage } from "./routes/ContactPage/ContactPage";
import { NotFound } from "./routes/NotFound/NotFound";

import 'react-notifications/lib/notifications.css';


const App = () => {
  // useLocation дает информацию о том на какой странице мы ходимся
  const location  = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board'; 
  const isActive = location.pathname === '/game/board'; 

  return (
    <>
      <Switch>
        <Route path='/404' component={ NotFound } />

        <Route>
          
          <>
            <MenuHeader 
              bgActive={ !isPadding }
            />

            <Switch>
              <Route path='/' exact component={ HomePage } />
              <PrivateRoute path='/game' component={ GamePage } />
              <PrivateRoute path='/about' component={ AboutPage } />
              <PrivateRoute path='/contact' component={ ContactPage } />
              <Route render={() => (<Redirect to='/404' /> )} />
              <Redirect from='/home' to='/'/>
              
            </Switch>

            <Footer 
              active={ isActive }            
            />
          </>

        </Route>
      </Switch>
      <NotificationContainer/>
    </>
  )
};

export default App;