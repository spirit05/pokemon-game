import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD7DlH5sNxwuj2MlUjS9ZTMjMJ4PSPf3oc",
    authDomain: "pokemon-game-3922e.firebaseapp.com",
    databaseURL: "https://pokemon-game-3922e-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-3922e",
    storageBucket: "pokemon-game-3922e.appspot.com",
    messagingSenderId: "168092574528",
    appId: "1:168092574528:web:5d626e7994197e6048d0a5"
  };

firebase.initializeApp(firebaseConfig);
  
class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  //Сокет соединение firebase (автоматическое обновление данных как в базе так и на всех устройствах)
  getCardSoket = cb => {
    this.database.ref('pokemons').on('value', snapshot => {
      cb(snapshot.val());
    })
  }

  // Метод отписки от событий (сработает как только мы покинем страницу, где была включена подписка на событие)
  ofCardSoket = () => {
    this.database.ref('pokemons').off();
  }

  getCardsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }

  postCard = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addCard = (data, cb) => {
    // Get a key for a new Post.
    const newPostKey = this.database.ref().child('pokemons').push().key;
    
    //С сокет соединением
    this.database.ref('pokemons/' + newPostKey).set(data);

    //С once
    // this.database.ref('pokemons/' + newPostKey).set({...data, ['id']: newPostKey}).then(() => cb());
  }
}

const fireBaseClass = new Firebase();

export default fireBaseClass; 