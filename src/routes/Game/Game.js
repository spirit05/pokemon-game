import { useRouteMatch, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "../../components/PrivateRoute/PrivateRoute";

import { StartPage } from './rootes/Start/StartPage';
import { BoardPage } from './rootes/Board/BoardPage';
import { FinishPage } from './rootes/Finish/FinishPage';

export const GamePage = () => {


    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage}  />
            <PrivateRoute path={`${match.path}/board`} component={BoardPage} />
            <PrivateRoute path={`${match.path}/finish`} component= {FinishPage} />
        </Switch>
    );
};
