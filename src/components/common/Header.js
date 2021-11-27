import Button from './Button';
import classNames from "../../assets/styles/common/HeaderNav.module.scss";
import { SignOutUserCognito } from '../../api/authApi'
import { useDispatch } from "react-redux";


const Header = () => {

    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(SignOutUserCognito())
    }

    return <div className={classNames.header}>
    <div className={classNames.header__childWrapper}>
        <Button onClick={signOut}>Sign Out</Button>
    </div>
    </div>;
}

export default Header;