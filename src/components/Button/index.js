import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary,
    text,
    outline,
    rounded,
    onClick,
    children,
    small,
    large,
    disabled,
    className,
    leftIcon,
    rightIcon,
    ...passProps
}) {
    let Comp = 'button';
    const props = { onClick, ...passProps };
    if (disabled) {
        delete props.onClick;
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    const classesCuaTao = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
    });
    return (
        <Comp className={classesCuaTao} {...props}>
            {leftIcon && <span className={cx('left', 'icon')}>{leftIcon}</span>}
            {<span className={cx('title')}>{children}</span>}
            {rightIcon && (
                <span className={cx('right', 'icon')}>{rightIcon}</span>
            )}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    text: PropTypes.bool,
    outline: PropTypes.bool,
    rounded: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    small: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
};

export default Button;
