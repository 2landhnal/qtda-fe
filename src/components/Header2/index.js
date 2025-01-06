import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { classCombine } from '../../utils/helper';
import { Link, NavLink } from 'react-router-dom';
import { routePath } from '../../routes';
import { isAccessTokenExpired } from '../../utils/helper';
import { useEffect, useState } from 'react';
import { del, get, post } from '../../utils/httpRequests';
import { authUrl } from '../../config';
import { useAuth } from '../../routes/authProvider';
import { useNavigate } from 'react-router-dom';
import Menu from '../Popper/Menu';
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faCircleQuestion,
    faCircleXmark,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faMagnifyingGlass,
    faMessage,
    faSearch,
    faSignIn,
    faSpinner,
    faUpload,
    faUser,
    faCoins,
    faGear,
    faSignOut,
    faL,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header2() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // Kiểm tra nếu cuộn xuống hơn 10px
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const options = {
            headers: {
                authorization: `Bearer ${refreshToken}`,
            },
        };
        await del(authUrl, '/logout', options);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAuth(false);

        console.log('Remove token done');
        console.log('start naviagte');
        navigate(routePath.home, { replace: true });
        console.log('navigate done');
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            onClick: handleLogout,
            separate: true,
        },
    ];

    return (
        <header
            className={cx('header', { scrolled: isScrolled })} // Thêm class 'scrolled' nếu cuộn
        >
            <Link to="/" className={cx('logo')}>
                SimpleSign
            </Link>
            {auth ? (
                <nav className={cx('navigation')}>
                    <Link to={routePath.home} className={cx('nav-link')}>
                        Home
                    </Link>
                    <Link to={routePath.signed} className={cx('nav-link')}>
                        Signed documents
                    </Link>
                    <Link to={routePath.signature} className={cx('nav-link')}>
                        My signature
                    </Link>
                    <Link to={routePath.verify} className={cx('nav-link')}>
                        Verify
                    </Link>
                    {!auth && (
                        <Link to={routePath.login} className={cx('nav-link')}>
                            Login
                        </Link>
                    )}
                    {auth && (
                        <Menu items={userMenu}>
                            <Image
                                className={cx('user-avatar')}
                                src="https://1.bp.blogspot.com/-VqNv4Rvn--4/XGJDujZsqmI/AAAAAAAA4As/mechGLfszq4qorJe3nW5s78VHFBpgePnQCLcBGAs/s1600/t%2526j07.jpg"
                                alt="User Avatar"
                            />
                        </Menu>
                    )}
                </nav>
            ) : (
                <div></div>
            )}
        </header>
    );
}

export default Header2;
