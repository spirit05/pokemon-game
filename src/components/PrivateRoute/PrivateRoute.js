import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min"

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={ props => 
                localStorage.getItem('idToken')
                    ? <Component {...props} />
                    : <Redirect to="/" />
            }
        />
    )
} 