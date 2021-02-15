import {useState, useEffect} from 'react';
import s from './style.module.css';
import YouWin from './assets/you-win.png';
import YouLose from './assets/you-lose.png';
import Draw from './assets/draw.png';
import { useHistory } from 'react-router-dom';

const Result = ({ type }) => {
   const [url, setUrl] = useState(null);
   const [tryAgaian, setTryAgaian] = useState(null);
   const history = useHistory();

   useEffect(() => {
       switch (type) {
           case 'win':
               setUrl(YouWin);
               break;
           case 'lose':
               setUrl(YouLose);
               setTryAgaian(prevState => !prevState)
               break;
           case 'draw':
               setUrl(Draw);
               setTryAgaian(prevState => !prevState)
               break;
           default:
               setUrl(YouWin);
       }
   }, [type]);

    if(!tryAgaian) {
        return (
            <div className={s.result}>
                <img src={url} alt="result" />
            </div>
        );
    } else {
        return (
            <div className={s.result}>
                <img src={url} alt="result" />
                <button
                    className={s.btn}
                    onClick={() => history.replace('/game')}
                >
                    Try again
                </button>
            </div>
        );
    }
};

export default Result;
