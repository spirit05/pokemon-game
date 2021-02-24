import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import fetchGitClass from '../../../../service/fetchGit';

import { selectPlayerOne } from '../../../../store/playerOne';
import { selectPlayerTwo } from '../../../../store/playerTwo';

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import ArrowChoice from "./component/ArrowChoice/index";
import { PlayerBoard } from './component/PlayerBoard/PlayerBoard';
import Result from './component/Result';

import s from './BoardPage.module.css';

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
};

export const BoardPage = () => {
    // получаем данные из редакс
    const playerOne = useSelector(selectPlayerOne);
    const playerTwo = useSelector(selectPlayerTwo);

    // устанавливаем первоначальное состояние
    const [ board, setBoard ] = useState([]);
    const [ player1, setPlayer1 ] = useState([]);   
    const [ player2, setPlayer2 ] = useState([]);
    const [ choiceCard, setChoiceCard ] = useState([]);
    const [ arrowActive, setArrowActive ] = useState(true);
    const [ arrowSide, setArrowSide ] = useState(0);
    const [ steps, setSteps ] = useState(0);
    const [ result, setResult ] = useState(null);
    
    const history = useHistory();

    // таймер для задержки имитации случайного выбора в начале игры
    const timer = () => {
        const random = Math.round( Math.random()) + 1;
        setArrowSide(random);
    };
    
    // настраиваем состояние при заходе на страницу
    useEffect(() => { 

        setPlayer1(() => {

            return Object.entries(playerOne).map(([ key, item ]) => ({
                ...item,
                possession: 'blue',
                key: key
            }) );

        });

        setPlayer2(playerTwo);

        fetchGitClass.getBoard().then(data => setBoard(data));
        
        setTimeout(timer, 3000);

        return () => clearTimeout(timer);

    }, [playerTwo, playerOne]);

    // при выбранной карте обрабатываем клик по полю
    const handlerClickBoardPlate = async position => {

        if (choiceCard.id) {

            const params = {
                position,
                card: choiceCard,
                board
            };
            
            if (choiceCard.player === 1) {
                setPlayer1( prevState => prevState.filter(item => item.key !== choiceCard.key || item.id !== choiceCard.id));
            }
            if (choiceCard.player === 2) {
                setPlayer2( prevState => prevState.filter(item => item.id !== choiceCard.id));
            }
            
            await fetchGitClass.handlerLogicBoard(params).then(data => setBoard(data));

            setSteps( prevState => {
                const count = prevState + 1;

                return count;
            });
            setArrowSide(prev => prev === 1 ? 2 : 1);
        } 

        setArrowActive(true);
        setChoiceCard([]);
    };

    // посчитываем количество ходов, для подсчета и вывода результата игры 
    useEffect( () => {
        if (steps === 9) {
            const [ count1, count2 ] = counterWin( board, player1, player2);
            
            if ( count1 > count2 ) {
                setTimeout(() => history.replace('/game/finish'), 2500)
                setResult('win');
            } else if ( count1 < count2 ) {
                setResult('lose');
            } else {
                setResult('draw');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [steps]);

    if (Object.keys(playerOne).length < 5) { 
        history.replace('/game');
    }

    return (
        <div className={ s.root }>
			<div className={ s.playerOne }>
                <PlayerBoard 
                    player={ 1 }
                    cards={ player1 }
                    onClickCard={ (card) => {
                        if( arrowActive) setArrowActive(false);
                        setChoiceCard(card) 
                    }}
                    step={ arrowSide }
                />
            </div>
            <div className={ s.board }>
                {
                    board.map(
                        item => (
                            <div 
                                key={ item.position }
                                className={ s.boardPlate }
                                onClick={() => !item.card && handlerClickBoardPlate(item.position)}
                            >
                                { 
                                    item.card && <PokemonCard {...item.card} isActive minimize />
                                }
                            </div>
                        )
                    )
                }
            </div>
            <div className={ s.playerTwo }>
                <PlayerBoard
                    player={ 2 } 
                    cards={ player2 }
                    onClickCard={ (card) => {
                        if( arrowActive) setArrowActive(false);
                        setChoiceCard(card) 
                    }}
                    step={ arrowSide }
                />
            </div>
            {
                steps < 9 ? 
                (
                    <ArrowChoice 
                        stop={ arrowActive }
                        side={ arrowSide }
                    />
                ) : ''
            }
            {
                steps === 9 ? <Result type={ result } /> : ''                
            }
        </div>
    );
};