import { useState } from "react";
import { Modal } from "../Modal/Modal";

import { Menu } from "./Menu/Menu";
import { NavBar } from "./Navbar/NavBar";

export const MenuHeader = ( { bgActive } ) => {
    const [isMenuActive, setMenuActive] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);

    const handlerChangeMenu = () => {

        setMenuActive(prevState => !prevState);
    };

    const handlerClickLogin = () => {
        setOpenModal(prevState => !prevState);
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
                bgActive={ bgActive }
                onChangeMenu={ handlerChangeMenu }
                onClickLogin={ handlerClickLogin }
            />
            <Modal 
                isOpen={ isOpenModal }
                title={ "login" } 
                onCloseModal={ handlerClickLogin }
            >
                Some text
            </Modal>
        </>
    );
};
