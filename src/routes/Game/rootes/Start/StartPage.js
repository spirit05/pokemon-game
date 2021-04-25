import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from './component/Loading/Loading';
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';
import { SelectedBox } from './component/Loading/StartPageCard/SelectedBox';

import { getPokemonsAsync, selectPokemonsData, selectPokemonsLoading } from '../../../../store/pokemon';
import { setPlayerOne } from '../../../../store/playerOne';
import { getPlayerTwoAsync } from '../../../../store/playerTwo';

import s from './StartPage.module.css';

export const StartPage = () => { 
    // получаем данные из стейта
    const pokemonsRedux = useSelector(selectPokemonsData);
    const isLoadingPokemons = useSelector(selectPokemonsLoading);
    const dispatch = useDispatch();
    
    // устанавливаем первоначальный стейт
    const [selectedCard, setSelectedCard] = useState({});
    const [ cards, setCards ] = useState({});
    console.log('cards: ', cards);

    const history = useHistory();

    //получаем количество выбранных карт для дальнейшего использования
    const countSelectedPokemons = Object.keys(selectedCard).length;
    
    //запускаем получение всех карт из базы и карт второго игрока,
    // и очищаем список выбранных карт при заходе на страницу  
    useEffect(() => {
        dispatch(getPokemonsAsync());
        dispatch(getPlayerTwoAsync());

        setSelectedCard({});
    }, [dispatch]);  

    // записываем полученные карточки из базы в стейт cards
    useEffect(() => {

        setCards(pokemonsRedux);

    },[pokemonsRedux]);

    // добавляем выбранную карту в объект selectedCard
    const handlerActiveSelected = (key) => {

        const pokemon = {...cards[key]};

        setSelectedCard(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }

            return {
                ...prevState, 
                [key]: pokemon
            };
        });

        setCards(prevState => (
            {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected,
                }
            }
        ));

    };

    // при нажатии на кнопку "start game" записываем в стейт первого игрока выбранные карты
    const handlerStartGameClick = () => {

        dispatch(setPlayerOne(selectedCard));

        history.push('/game/board');
    }

    return (
        <>
            <div className={s.root}>
                <div className={s.start} >
                <h1>Начнем игру! Для начала выбери 5 карт!</h1>
                {
                    // Пока идет получение карт показываем загрузчик с крутящимся покеболом
                    isLoadingPokemons && <Loading />
                }
                <div className={s.flex}>
                    {
                        Object.entries(cards).map( 
                            ([key,{ id, name, img, type, values, selected }]) => (
                                <PokemonCard 
                                    className={ s.card }
                                    key={ key }
                                    name = { name }
                                    id = { id } 
                                    img = { img }
                                    type = { type }
                                    values = { values }
                                    isActive = { true }
                                    isSelected = { selected }
                                    onChangeCard = { () => { 
                                            if (countSelectedPokemons < 5 || selected) {
                                                handlerActiveSelected(key);
                                            } 
                                        }
                                    }
                                /> 
                            )
                        )
                    }
                </div>
                </div>
                    <SelectedBox 
                        cards={ selectedCard  } 
                        allPokemons={ pokemonsRedux }
                        onChangeCard= { key => handlerActiveSelected(key) }
                        startGame={ handlerStartGameClick }
                    />
            </div>
        </>
    );
};