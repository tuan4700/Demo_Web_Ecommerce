import { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import Menu from './icon/bars.svg';
import Cart from './icon/cart.svg';
import Close from './icon/close.svg';

function Header() {
    const value = useContext(GlobalState);
    return (
        <div>
            <div>
                <img src={Menu} alt="" width="30px"/>
            </div>
        </div>
    )
}

export default Header;