import { useHistory } from "react-router-dom";

import fireBaseClass from "../../../../../../service/firebase";

import cn from 'classnames';
import s from "./finishPageAlert.module.css";

export const FinishPageAlert = ({ cb, card = false }) => {
    const history = useHistory();

    const fire = fireBaseClass;

    // при клике на кнопку добавить выбраную карту, добавляем ее в базу
    const handlerAddCard = () =>{
        fire.addCard(card);
        history.push('/game');
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