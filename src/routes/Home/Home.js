import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";

import s from './home.module.css';

import bg2 from '../../img/bg2.jpg';
import logoImg from '../../img/logo.png';

const HomePage = () => {
  return (
    <>
      <Header 
        title= 'Pokemon Game'
        descr="This is simple triple triad card game"
      />
      <Layout 
        id="1"
        title= 'About game'
        urlBg={bg2}
      >
        <img src={logoImg} className={ s.logo} alt="Pokemon Game Logo" />
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" jn a 3x3 grid</p>
        <p>Each player has five cards in a hand and yhe aim is to capture the opponent's cards by turning them into the playser's own color of red or blue.</p>
      </Layout>
      <Layout 
        id="3"
        title= 'Rules'
        urlBg={bg2}
      >
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared.</p>
        <p>If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
      </Layout>
    </>
  )
}

export default HomePage;