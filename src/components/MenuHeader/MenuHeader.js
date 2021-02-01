import { useState } from "react";
import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";

export const MenuHeader = () => {
    const [menuActive, setMenuActive] = useState(false);

    const handlerChangeMenu = (bool) => {
        setMenuActive(bool);
    };

    return (
        <>
            <NavBar 
                id="navbar"
                menuActive={ menuActive }
                onChangeMenu={ handlerChangeMenu }
            />
            <Menu 
                menuActive={ menuActive }
            />
        </>
    );
};
