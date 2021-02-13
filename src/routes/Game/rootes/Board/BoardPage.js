import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import ArrowChoice from "./component/ArrowChoice/index";

import { PokemonContext } from '../../../../context/pokemonContext';

import s from './BoardPage.module.css';
import { PlayerBoard } from './component/PlayerBoard/PlayerBoard';
import Result from './component/Result';

const counterWin = ( board, player1, player2 ) => {
    let playerCountOne = player1.length;
    let playerCountTwo = player2.length;

    board.forEach( item => {
        if (item.card.possession === 'red') {
            playerCountTwo++;
        } 

        if (item.card.possession === 'blue') {
            playerCountOne++;

        }
    });

    return [playerCountOne, playerCountTwo];
}

export const BoardPage = () => {
    const { pokemons, player2Card, onChangeStatusGame } = useContext(PokemonContext);

    const [ board, setBoard ] = useState([]);
    const [ player1, setPlayer1 ] = useState( () => {
        return Object.values(pokemons).map( item => ({
            ...item,
            possession: 'blue'
        }) )
    } );
    const [ player2, setPlayer2 ] = useState(player2Card);
    const [ choiceCard, setChoiceCard ] = useState([]);
    const [ arrowActive, setArrowActive ] = useState(true);
    const [ steps, setSteps ] = useState(0);
    const [ result, setResult ] = useState(null);
    
    const history = useHistory();

    if (Object.keys(pokemons).length < 5) { 
        history.replace('/game');
    }

    const getBoard = async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
        const boardRequest = await boardResponse.json();

        
        setBoard(boardRequest.data);
    };

    useEffect(() => {
        getBoard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hendlerClickBoardPlate = async position => {
        if (choiceCard.id) {
            const params = {
                position,
                card: choiceCard,
                board
            };
            
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();
            
            if (choiceCard.player === 1) {
                setPlayer1( prevState => prevState.filter(item => item.id !== choiceCard.id));
            }
            if (choiceCard.player === 2) {
                setPlayer2( prevState => prevState.filter(item => item.id !== choiceCard.id));
            }

            setBoard(request.data);
            setSteps( prevState => {
                const count = prevState + 1;

                return count;
            })
        } 
        setChoiceCard([]);
    }

    useEffect( () => {
        if (steps === 9) {
            const [ count1, count2 ] = counterWin( board, player1, player2);
            
            if ( count1 > count2 ) {
                setTimeout(() => history.replace('/game/finish'), 5000)
                setResult('win');
                onChangeStatusGame('win');
            } else if ( count1 < count2 ) {
                setResult('lose');
            } else {
                setResult('draw');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps])

    return (
        <div className={ s.root }>
            <ArrowChoice isArrowActive={ arrowActive } />
			<div className={ s.playerOne }>
                <PlayerBoard 
                    player={ 1 }
                    cards={ player1 }
                    onClickCard={ card => {
                        if(arrowActive) setArrowActive(prevState => !prevState);
                        setChoiceCard(card) 
                    }}
                />
            </div>
            <div className={ s.board }>
                {
                    board.map(item => (
                        <div 
                            key={ item.position }
                            className={ s.boardPlate }
                            onClick={() => !item.card && hendlerClickBoardPlate(item.position)}
                        >
                            { 
                                item.card && <PokemonCard {...item.card} isActive minimize />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={ s.playerTwo }>
                <PlayerBoard
                    player={ 2 } 
                    cards={ player2 }
                    onClickCard={ card => setChoiceCard(card) }
                />
            </div>
            {
                steps === 9 ? <Result type={ result } /> : ''                
            }
        </div>
    );
};