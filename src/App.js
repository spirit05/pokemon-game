import { useState } from 'react';
import { GamePage } from './Routes/Game/Game';
import HomePage from './Routes/Home/Home';

const App = () => {
  const [page, setPage] = useState("app");

  const handlerChangePage = (page) => {
    console.log('####: <App />');
    setPage(page);
  }

  switch (page) {
    case "app": 
      return <HomePage onChangePage={handlerChangePage} />
    case "game": 
      return <GamePage onChangePage={handlerChangePage}  />
    default: 
      return <HomePage />
  }
};

export default App;