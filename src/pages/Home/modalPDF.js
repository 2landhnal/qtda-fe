import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ModalPDF({ url, onClose }) {
    return (
        <div className={cx('pdfModalOverlay')}>
            <div className={cx('pdfModalContent')}>
                <button className={cx('closeButton')} onClick={onClose}>
                    &times;
                </button>
                {url && (
                    <iframe
                        title="PDF Viewer"
                        src={url}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                    />
                )}
            </div>
        </div>
    );
}

export default ModalPDF;
