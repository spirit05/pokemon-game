import { useState } from "react";
import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";

export const MenuHeader = ( { bgActive } ) => {
    const [isMenuActive, setMenuActive] = useState(null);

    const handlerChangeMenu = () => {
        setMenuActive(prevState => !prevState);
    };

    return (
        <>
            <Menu 
                isMenuActive={ isMenuActive }
                onChangeMenu={ handlerChangeMenu }
            />
            <NavBar 
                id="navbar"
                isMenuActive={ isMenuActive }
                bgActive={bgActive}
                onChangeMenu={ handlerChangeMenu }
            />
        </>
    );
};
