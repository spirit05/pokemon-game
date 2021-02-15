import cn from 'classnames';

import s from './style.module.css';

const ArrowChoice = ({ isArrowActive = false, side = 0 }) => {
    return <div className={cn(s.arrow, {
        [s.hide]: !isArrowActive ,
        [s.leftSide]: side === 1,
        [s.rightSide]: side === 2
    })} />;
};

export default ArrowChoice;
