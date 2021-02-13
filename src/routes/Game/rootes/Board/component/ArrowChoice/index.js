import cn from 'classnames';

import s from './style.module.css';

const ArrowChoice = ({ isArrowActive = false }) => {
    return <div className={cn(s.arrow, {[s.hide]: !isArrowActive })} />;
};

export default ArrowChoice;
