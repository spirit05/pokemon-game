import s from './aboutPage.module.css';

export const AboutPage = () => {
    return (
        <div className={s.section}>
            <h1 className={s.title}>About The Game</h1>
            <div className={s.descr}>
                <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
    Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.</p>
                <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead. </p>
            </div>
        </div>
    )
}