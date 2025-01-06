import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx("footer")}>
            <div className={cx("footer-container")}>
                <div className={cx("footer-grid")}>
                    {/* Company Info */}
                    <div className={cx("footer-company")}>
                        <p className={cx("company-description")}>
                            Appland is completely creative, lightweight, clean
                            app landing page.
                        </p>
                        <p className={cx("company-credit")}>
                            Made with by{' '}
                            <a href="#" className={cx("company-link")}>
                                Designing World
                            </a>
                        </p>
                        <div className={cx("social-links")}>
                            <a href="#" className={cx("social-link")}>
                                <i className={cx("fab fa-facebook")}></i>
                            </a>
                            <a href="#" className={cx("social-link")}>
                                <i className={cx("fab fa-twitter")}></i>
                            </a>
                            <a href="#" className={cx("social-link")}>
                                <i className={cx("fab fa-skype")}></i>
                            </a>
                        </div>
                    </div>

                    {/* About Column */}
                    <div className={cx("footer-column")}>
                        <h3 className={cx("footer-heading")}>About</h3>
                        <ul className={cx("footer-links")}>
                            <li>
                                <a href="#">About Us</a>
                            </li>
                            <li>
                                <a href="#">Corporate Sale</a>
                            </li>
                            <li>
                                <a href="#">Terms & Policy</a>
                            </li>
                            <li>
                                <a href="#">Community</a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className={cx("footer-column")}>
                        <h3 className={cx("footer-heading")}>Support</h3>
                        <ul className={cx("footer-links")}>
                            <li>
                                <a href="#">Help</a>
                            </li>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Term & Conditions</a>
                            </li>
                            <li>
                                <a href="#">Help & Support</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className={cx("footer-column")}>
                        <h3 className={cx("footer-heading")}>Contact</h3>
                        <ul className={cx("footer-links")}>
                            <li>
                                <a href="#">Call Centre</a>
                            </li>
                            <li>
                                <a href="#">Email Us</a>
                            </li>
                            <li>
                                <a href="#">Term & Conditions</a>
                            </li>
                            <li>
                                <a href="#">Help Center</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
