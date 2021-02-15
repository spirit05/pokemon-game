import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import { FinishPageAlert } from "./component/Alert/FinishPageAlert";

import s from './FinishPage.module.css';

export const FinishPage = () => {
    const { pokemons: player1, player2Card: player2 } = useContext(PokemonContext);
    const [ selectedCard, setSelectedCard ] = useState(player2);
    const [ takedCard, setTakedCard ] = useState(null);
    const [ cards, setCards ] = useState({});
    const [ alert, setAlert ] = useState(null);

    const fire = useContext(FireBaseContext);

    const getCards = async () => {
        const responce = await fire.getCardsOnce();
        setCards(responce);    
    };

    useEffect(() => {
        getCards();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const history = useHistory();

    if(Object.keys(player1).length < 5) {
        history.replace('/game');
    }

    const handlerClickTakedCard = card => {
        setSelectedCard(prevState => prevState.map( item => {
            item.id === card.id ? item.selected = true : item.selected = false;
            return item
        }));

        const copyCard = {...card};
        delete copyCard.selected;

        setTakedCard(copyCard);
    };

    const checkCards = card => {
        return Object.values(cards).findIndex(item => item.id === card.id);
    }
        
    const handlerBackStart = () => {
        if(takedCard && checkCards(takedCard) === -1) {
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
                        Object.entries(player1).map( ([key,{ id, name, img, type, values }]) => (
                            <PokemonCard 
                                className={ s.card }
                                key={ key }
                                name = { name }
                                id = { id } 
                                img = { img }
                                type = { type }
                                values = { values }
                                isActive = { true }
                            /> ))
                    } 
                </div>
                <div className={ s.info }>
                    <h2>You win and you can take one of the opponent's cards to your collection!</h2>
                    {

                    }
                    <button 
                        className={ s.btn }
                        onClick={ handlerBackStart }
                    >
                        Take up selected card  
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
                <h3 className={ s.title }>Opponent's card, choose one of them!</h3>
                <div className={ s.player }>
                    {
                        selectedCard.map( item => (
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
                        ))
                    } 
                </div>
            </div>

        </>
    )
}