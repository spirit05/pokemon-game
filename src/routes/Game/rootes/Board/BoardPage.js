import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import ArrowChoice from "./component/ArrowChoice/index";

import { PokemonContext } from '../../../../context/pokemonContext';
import { FetchGitContext } from '../../../../context/fetchGitContext';

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
    const git = useContext(FetchGitContext);

    const [ board, setBoard ] = useState([]);
    const [ player1, setPlayer1 ] = useState( () => {
        return Object.entries(pokemons).map(([ key, item ]) => ({
            ...item,
            possession: 'blue',
            key: key
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

    useEffect(() => {
        git.getBoard().then(data => setBoard(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hendlerClickBoardPlate = async position => {
        if (choiceCard.id) {
            const params = {
                position,
                card: choiceCard,
                board
            };
            
            if (choiceCard.player === 1) {
                setPlayer1( prevState => prevState.filter(item => item.id !== choiceCard.id));
            }
            if (choiceCard.player === 2) {
                setPlayer2( prevState => prevState.filter(item => item.id !== choiceCard.id));
            }
            
            await git.handlerLogicBoard(params).then(data => setBoard(data))

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
                setTimeout(() => history.replace('/game/finish'), 2500)
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