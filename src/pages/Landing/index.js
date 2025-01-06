import { routePath } from '../../routes';
import styles from './Landing.module.scss';
import classNames from 'classnames/bind';
import { useAuth } from '../../routes/authProvider';

const cx = classNames.bind(styles);
function Landing() {
    const { auth } = useAuth();
    return (
        <div className={cx('landing-container')}>
            {/* Background Image */}
            <div className={cx('background-image')}></div>

            {/* Content Overlay */}
            <div className={cx('content-overlay')}>
                <div className={cx('content-wrapper')}>
                    <h1 className={cx('title')}>Sign Smart, Secure Start!</h1>

                    <p className={cx('description')}>
                        Chúng tôi tự hào cung cấp dịch vụ chữ ký số an toàn,
                        nhanh chóng và đáng tin cậy. Được chứng nhận bởi các cơ
                        quan có thẩm quyền, chữ ký số của chúng tôi sẽ giúp bạn
                        thực hiện các giao dịch điện tử một cách dễ dàng và bảo
                        mật tuyệt đối. Đừng để các thủ tục giấy tờ làm bạn trì
                        hoãn công việc – hãy chuyển sang chữ ký số ngay hôm nay!
                    </p>

                    {!auth && (
                        <div className={cx('button-group')}>
                            <a
                                href={routePath.login}
                                className={cx('button', 'button-login')}
                            >
                                Login
                            </a>
                            <a
                                href={routePath.login}
                                className={cx('button', 'button-signup')}
                            >
                                Sign up
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Landing;
