import { useHistory } from "react-router-dom";
import { useContext } from "react";

import { FireBaseContext } from "../../../../../../context/firebaseContext";

import cn from 'classnames';
import s from "./finishPageAlert.module.css";

export const FinishPageAlert = ({ cb, card }) => {
    const history = useHistory();
    const fire = useContext(FireBaseContext);

    const handlerAddCard = () =>{
        fire.addCard(card);
        history.push('/game');
    };

    const handlerBackStart = () => {
        history.replace('/game');
    };

    return (
        <div className={ s.alert }>
            <h3>This card is already in your collection!</h3>
            <div>
                <button className={ cn( s.btn, s.btnInfo )  } onClick={ () => cb() }>Choose another card</button>
                {
                    !card ? '' : (
                    <button 
                        className={ cn( s.btn, s.btnAdd )  } 
                        onClick={ handlerAddCard }
                    >
                        Add selected
                    </button>
                    )
                }
                <button className={ cn( s.btn, s.btnSkip )  } onClick={ handlerBackStart }>Not add any card</button>
            </div>
        </div>
    )
}