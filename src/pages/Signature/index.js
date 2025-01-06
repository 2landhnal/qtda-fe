import React, { useEffect, useState } from 'react';
import styles from './Signature.module.scss';
import classNames from 'classnames/bind';
import { get } from '../../utils/httpRequests';
import { docUrl, signUrl } from '../../config';
import { optionWithAccessToken } from '../../utils/helper';

const cx = classNames.bind(styles);

function Signature() {
    const [docs, setDocs] = useState([]);

    const handleDocOnClick = (doc) => {
        alert(doc._id);
    };

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const option = optionWithAccessToken();
                const response = await get(
                    signUrl,
                    '/authRequired/getAll',
                    option,
                );
                console.log(response);

                if (response) {
                    setDocs(response);
                } else {
                    console.error('Docs not found in response:', response);
                }
            } catch (error) {
                console.error('Failed to fetch documents:', error);
            }
        };

        fetchDocs();
    }, []);

    return (
        <div className={cx('dashboard')}>
            <div className={cx('dashboard-container')}>
                {/* Header */}

                {/* Grid Layout */}
                <div className={cx('grid-container')}>
                    {docs.length > 0 ? (
                        docs.map((doc, index) => (
                            <div
                                key={index}
                                className={cx('card')}
                                onClick={() => handleDocOnClick(doc)}
                            >
                                <div className={cx('card-image')}>
                                    <img
                                        src={
                                            doc.avatarUrl ||
                                            'https://upload.wikimedia.org/wikipedia/en/4/4c/GokumangaToriyama.png'
                                        }
                                        alt="placeholder"
                                    />
                                </div>
                                <h3 className={cx('card-title')}>
                                    {doc.alias}
                                </h3>
                                <p className={cx('card-description')}>
                                    This is a placeholder card in the grid
                                    layout.
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No documents available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signature;
