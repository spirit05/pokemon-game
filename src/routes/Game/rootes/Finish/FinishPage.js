import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import fireBaseClass from "../../../../service/firebase";

import { selectPokemonsData } from "../../../../store/pokemon";
import { selectPlayerOne } from "../../../../store/playerOne";
import { selectPlayerTwo } from "../../../../store/playerTwo";

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { FinishPageAlert } from "./component/Alert/FinishPageAlert";

import s from './FinishPage.module.css';

export const FinishPage = () => {

    const player1 = useSelector(selectPlayerOne);
    const player2  = useSelector(selectPlayerTwo);
    const pokemonInBase = useSelector(selectPokemonsData); 

    const [ selectedCard, setSelectedCard ] = useState([]);
    const [ takedCard, setTakedCard ] = useState(null);
    const [ alert, setAlert ] = useState(null);

    const history = useHistory();
    
    const fire = fireBaseClass;

    if(Object.keys(player1).length < 5) {
        history.replace('/game');
    }

    useEffect(() => {

        setSelectedCard(player2);

    }, [player2]);

    const handlerClickTakedCard = card => {

        setSelectedCard(prevState => prevState.map( item => (
            {
                ...item,
                selected: item.id === card.id ? true : false,
            }
        )));

        delete card.selected;

        setTakedCard(card);
    };

    const checkCards = card => {
        return Object.values(pokemonInBase).findIndex(item => item.id === card.id);
    };
        
    const handlerBackStart = () => {

        if (takedCard && checkCards(takedCard) === -1) {
            fire.addCard(takedCard);
            history.push('/game');
        } else {
            setAlert(prevState => !prevState);
        }

    };
    
    return (
        <>
            <div className={ s.root } >
                    <h3 className={ s.title }>Your cards</h3>
                <div className={ s.player }>
                    {
                        Object.entries(player1).map( 
                            ([key,{ id, name, img, type, values }]) => (
                                <PokemonCard 
                                    className={ s.card }
                                    key={ key }
                                    name = { name }
                                    id = { id } 
                                    img = { img }
                                    type = { type }
                                    values = { values }
                                    isActive = { true }
                                />
                            )
                        )
                    } 
                </div>
                <div className={ s.info }>
                    <h2>Ты победил и теперь можешь забрать одну из карт противника в свою коллекцию!</h2>
                    <button 
                        className={ s.btn }
                        onClick={ handlerBackStart }
                    >
                        Забрать выбранную карту  
                    </button>
                    {
                        alert ?
                        (
                            <FinishPageAlert 
                                cb={ () => setAlert(prevState => !prevState) }
                                card={ takedCard }
                            />
                        ) :
                        ''
                    }
                </div>
                <h3 className={ s.title }>Карты противника, выберите одну из них!</h3>
                <div className={ s.player }>
                    {
                        selectedCard.map( 
                            item => (
                                <div 
                                    key={item.id}
                                    className={ s.player } 
                                    onClick={ () => handlerClickTakedCard(item) } 
                                >
                                    <PokemonCard 
                                        className={ s.card }
                                        name = { item.name }
                                        id = { item.id } 
                                        img = { item.img }
                                        type = { item.type }
                                        values = { item.values }
                                        isActive = { true }
                                        isSelected = { item.selected }
                                    /> 
                                </div>
                            )
                        )
                    } 
                </div>
            </div>

        </>
    )
};