import { useRouteMatch, Route, Switch } from "react-router-dom";

import { StartPage } from './rootes/Start/StartPage';
import { BoardPage } from './rootes/Board/BoardPage';
import { FinishPage } from './rootes/Finish/FinishPage';

export const GamePage = () => {


    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage}  />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component= {FinishPage} />
        </Switch>
    );
};
