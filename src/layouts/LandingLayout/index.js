import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const cx = classNames.bind(styles);

function LandingLayout({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>{children}</div>
            <Footer />
        </div>
    );
}

LandingLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LandingLayout;
