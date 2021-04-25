import anime from 'animejs';

let current = null;

export const animeInput = (e) => {

    // Получаем имя элемента на который установлен фокус
    const t = e.target.name;
    // Устанавливаем значение strokeDashoffset => value в соответствии с именем элемента
    const nameValueOffset = t === 'email' ? 0 : t === 'password' ? -336 : -730;

    if (current) current.pause();
    // Отрисовываем анимацию при переходе фокуса с одного элемента к другому используя библиотеку animate
    current = anime({
        targets: 'path',
        strokeDashoffset: {
            value: nameValueOffset,
            duration: 700,
            easing: 'easeOutQuart'
        },
        strokeDasharray: {
            value: t === 'submit' ? '530 1386' : '240 1386',
            duration: 700,
            easing: 'easeOutQuart'
        }
    })
}

export const counterWin = ( board, player1, player2 ) => {
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
