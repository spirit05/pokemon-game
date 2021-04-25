import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../../../../components/PokemonCard/PokemonCard';
import { playerOneLoading, setPlayerOne } from '../../../../../../../store/playerOne';
import { selectPokemonsLoading } from '../../../../../../../store/pokemon';

import s from './selectedBox.module.css';

export const SelectedBox = ( { cards, allPokemons = {}, onChangeCard, startGame } ) => {
    //получаем из стейта состояние загрузки карт из базы, 
    // чтобы при не загруженых картах деактивировать кнопку "random game"
    const isLoadingPokemons = useSelector(selectPokemonsLoading); 
    const isLoadingPlayerOne = useSelector(playerOneLoading);

    const dispatch = useDispatch();
    const history = useHistory();

    //Получаем колличество карт в объекте cards
    const cardsLen = Object.keys(cards).length;

    //Передаем ключ выбранной карты для изменения свойства selected
    //в стейте selectedCard на StartPage, чтобы можно было выбрать другую карту
    const removeSelectedCard = (key) => {

        onChangeCard && onChangeCard(key)

    };

    //Выбираем 5 случайных карт либо дополняем выбранные карты случайными до 5
    //заносим выбранные карты в стейт первого игрока и начинаем игру
    const handlerRandomCards = () => {

        const keys = Object.keys(allPokemons);

        const len = keys.length;

        let player1 = {...cards};

        for( let i = 0; Object.keys(player1).length < 5; i++) {
            
            let k = len < 6 ? keys[i] : keys[Math.floor(Math.random() * (len - 1))]; 

            let item = Object.entries(allPokemons).find(([key]) => key === k );            

            player1 = { ...player1, [`${item[0]}`]: item[1] };
        }

        dispatch(setPlayerOne(player1));
        
        history.push('/game/board');

    };

    return (
        <div className={ s.selectedBox }>            
            <div className={s.selectedPokemon}>
                {
                    // проверяем количество полученных выбранных карт, чтобы избежать ошибки рендера
                    cardsLen !== 0 
                        && Object.entries(cards).map( 
                            ([key,{ id, name, img, type, values, selected }]) => (
                                <div 
                                    key={ key }
                                    onClick={ () => {
                                        if (cardsLen <= 5 || selected) {
                                            removeSelectedCard(key)
                                        }
                                    } }
                                >
                                    <PokemonCard 
                                        className={ s.selectedCard }
                                        name = { name }
                                        id = { id } 
                                        img = { img }
                                        type = { type }
                                        value = { false }
                                        values = { values }
                                        isActive = { true }
                                        minimize
                                        isSelected = { selected }
                                    /> 
                                </div>
                            )
                         )
                }
            </div>
            {
                cardsLen === 5 ? 
                (
                    //если выбрано 5 карт показываем кнопку "Start Game"
                    <button 
                        onClick={ () => startGame && startGame() }
                        className={ s.startBtn }
                    >
                        Начать игру
                    </button>
                ) :
                (
                    //если карты не выбраны или выбранных  карт меньше пяти показываем кнопку "Random cards"
                    <>
                        <h3>Выбрано покемонов: { cardsLen }</h3>
                        <button 
                            onClick={ handlerRandomCards }
                            className={ s.startBtn }
                            disabled={ isLoadingPokemons && isLoadingPlayerOne }
                        >
                            Играть случайными
                        </button>
                    </>
                )
            }
        </div>
    )
}