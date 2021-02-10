import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PokemonCard from '../../../../components/PokemonCard/PokemonCard';

import { database } from '../../../../service/firebase';

import s from './StartPage.module.css';

const DATA = {
    "abilities": [
        "keen-eye",
        "tangled-feet",
        "big-pecks"
      ],
      "stats": {
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 71
      },
      "type": "flying",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
      "name": "pidgeotto",
      "base_experience": 122,
      "height": 11,
      "id": 'randomId',
      "values": {
        "top": "A",
        "right": 2,
        "bottom": 7,
        "left": 5
      }
}

export const StartPage = () => { 
    const [ cards, setCards ] = useState({});

    const getCards = () => {
        database.ref('pokemons').once('value', snapshot => {
            setCards(snapshot.val());
          });    
    };
    
    useEffect(()=> {
          getCards();
    }, []);  

    const history = useHistory();

    const handlerClick = (id) => {
        //New solved
        setCards(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                };

                acc[item[0]] = pokemon;

                database.ref('pokemons/' + item[0]).set(pokemon);

                return acc;
            }, {});
        });
    };

    const handlerBackHome = () => {
        history.push('/');
    }

    const handlerAddPokemon = () => {
        // A post entry.
        const data = DATA;

        // Get a key for a new Post.
        const newPostKey = database.ref().child('pokemons').push().key;
    
        database.ref('pokemons/' + newPostKey).set(data).then(() => getCards());
    }

    return (
        <>
            <div className={s.root}>
                <h1>Let's started!!!!</h1>
                <button onClick={ handlerAddPokemon } >Add new pokemon</button>
                <div className={s.flex}>
                    {
                        Object.entries(cards).map( ([key,{ id, name, img, type, values, active }]) => (
                            <PokemonCard 
                                className={ s.card }
                                key={ key }
                                name = { name }
                                id = { id } 
                                img = { img }
                                type = { type }
                                values = { values }
                                isActive = { true }
                                onChangeCard = { handlerClick }
                            /> ))
                    }
                </div>
                <button onClick={ handlerBackHome } >Back Home Page</button>
            </div>
        </>
    );
};