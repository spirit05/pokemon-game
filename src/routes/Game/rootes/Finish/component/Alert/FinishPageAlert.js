import { useHistory } from "react-router-dom";

import cn from 'classnames';
import s from "./finishPageAlert.module.css";
import { useSelector } from "react-redux";
import { selectLocalId } from "../../../../../../store/user";

export const FinishPageAlert = ({ cb, card = false }) => {
    const history = useHistory();
    const localId = useSelector(selectLocalId);
    const token = localStorage.getItem('idToken');
    console.log('token: ', token);

    // при клике на кнопку добавить выбраную карту, добавляем ее в базу
    const handlerAddCard = async () =>{
        await fetch(`https://pokemon-game-3922e-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${token}`, {
                        method: 'POST',
                        body: JSON.stringify(card)
                    });
        // history.push('/game');
    };

    // при клике на кнопку "I don't need these cards" перходим на стартовую страницу без добавления карточки
    const handlerBackStart = () => {
        history.replace('/game');
    };

    return (
        <div className={ s.alert }>
            <h3>{ !card ? 'Не выбрана ни одна карта!' : 'Такая карта уже есть в твоей коллекции!'}</h3>
            <div>
                <button 
                    className={ cn( s.btn, s.btnInfo )  } 
                    onClick={ () => cb() }
                >
                    Выбрать другую карту!
                </button>
                {
                    !card ? '' : (
                        <button 
                            className={ cn( s.btn, s.btnAdd )  } 
                            onClick={ handlerAddCard }
                        >
                            Я хочу эту карту!
                        </button>
                    )
                }
                <button 
                    className={ cn( s.btn, s.btnSkip )  } 
                    onClick={ handlerBackStart }
                >
                    Мне не нужны эти карты
                </button>
            </div>
        </div>
    )
}