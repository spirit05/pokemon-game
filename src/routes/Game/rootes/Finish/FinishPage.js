import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import fireBaseClass from "../../../../service/firebase";
import { selectPokemonsData } from "../../../../store/pokemon";
import { playerOne } from "../../../../store/playerOne";
import { FinishPageAlert } from "./component/Alert/FinishPageAlert";

import s from './FinishPage.module.css';
import { selectPlayerTwo } from "../../../../store/playerTwo";

export const FinishPage = () => {
    const player2  = useSelector(selectPlayerTwo);
    const player1 = useSelector(playerOne);
    const pokemonInBase = useSelector(selectPokemonsData); 

    const [ selectedCard, setSelectedCard ] = useState([]);
    const [ takedCard, setTakedCard ] = useState(null);
    const [ alert, setAlert ] = useState(null);

    const fire = fireBaseClass;

    const history = useHistory();

    if(Object.keys(player1).length < 5) {
        history.replace('/game');
    }

    useEffect(() => {
        setSelectedCard(player2);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlerClickTakedCard = card => {
        setSelectedCard(prevState => prevState.map( item => ({
            ...item,
            selected: item.id === card.id ? true : false,
        })));

        delete card.selected;

        setTakedCard(card);
    };

    const checkCards = card => {
        return Object.values(pokemonInBase).findIndex(item => item.id === card.id);
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