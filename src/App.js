import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import { MenuHeader } from "./components/MenuHeader/MenuHeader";
import HomePage from './routes/Home/Home';
import { GamePage } from './routes/Game/Game';
import { AboutPage } from "./routes/AboutPage/AboutPage";
import { ContactPage } from "./routes/ContactPage/ContactPage";
import Footer from "./components/Footer/Footer";
import { NotFound } from "./routes/NotFound/NotFound";

import { FireBaseContext } from './context/firebaseContext';
import Firebase from "./service/firebase";


const App = () => {
  // useLocation дает информацию о том на какой странице мы ходимся
  const location  = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board'; 

  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path='/404' component={ NotFound } />

        <Route>
          
          <>
            <MenuHeader 
              bgActive={ !isPadding }
            />

            <Switch>
              <Route path='/' exact component={ HomePage } />
              <Route path='/game' component={ GamePage } />
              <Route path='/about' component={ AboutPage } />
              <Route path='/contact' component={ ContactPage } />
              <Route render={() => (<Redirect to='/404' /> )} />
              <Redirect from='/home' to='/'/>
              
            </Switch>

            <Footer />
          </>

        </Route>
      </Switch>
    </FireBaseContext.Provider>
  )
};

export default App;