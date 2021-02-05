import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PokemonCard from '../../components/PokemonCard/PokemonCard';

import { database, fire } from '../../service/firebase';

import s from './game.module.css';

export const GamePage = () => { 
    const [ cards, setCard ] = useState({});
    
    useEffect(()=> {
        database.ref('pokemons').on('value', snapshot => {
            setCard(snapshot.val());
          })      
    }, [])   

    const history = useHistory();

    const handlerClick = (cardId) => {
        setCard(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === cardId) {
                    pokemon.active = !pokemon.active;
                    fire.database().ref('pokemons/' + item[0]).set({...pokemon});
                }
                
                acc[item[0]] = pokemon;

                return acc;
            }, {});
        });
    }  

    const handlerBackHome = () => {
        history.push('/');
    }

    const handlerAddPokemon = () => {
        // A post entry.
        const randomId = parseInt(Math.random() * 100);

        const postData = {
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
              "id": randomId,
              "values": {
                "top": "A",
                "right": 2,
                "bottom": 7,
                "left": 5
              }
        };
    
        // Get a key for a new Post.
        const newPostKey = fire.database().ref().child('pokemons').push().key;
    
        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['pokemons/' + newPostKey] = postData;
    
        return fire.database().ref().update(updates);
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
                                key={ id }
                                objId={ key }
                                name = { name }
                                id = { id } 
                                img = { img }
                                type = { type }
                                values = { values }
                                isActive = { active }
                                onChangeCard = { handlerClick }
                            /> ))
                    }
                </div>
                <button onClick={ handlerBackHome } >Back Home Page</button>
            </div>
        </>
    );
};