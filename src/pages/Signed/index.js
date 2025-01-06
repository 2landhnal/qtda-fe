import React, { useEffect, useState } from 'react';
import styles from './Signed.module.scss';
import classNames from 'classnames/bind';
import { get, post, del } from '../../utils/httpRequests';
import { docUrl, signUrl, mqUrl } from '../../config';
import { optionWithAccessToken } from '../../utils/helper';
import { fetchGet, fetchPost } from '../../utils/fetch';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import ModalPDF from './modalPDF';
import Menu from '../../components/Popper/Menu';
import Loading from '../../components/Loading';
import Image from '../../components/Image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Signed() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadFileOpen, setuploadFileOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null); // state để lưu URL của PDF

    const handleDelete = async (event, doc) => {
        event.stopPropagation();
        const option = optionWithAccessToken();
        console.log(doc._id);
        await del(docUrl, `authRequired/deleteSignedDoc/${doc._id}`, option);
        toast.success('Delete document successfully!', { autoClose: 3000 });
    };
    const handleShare = () => {};
    const handleSign = async (doc) => {
        setLoading(true);
        console.log(doc);
        const signature = await fetchGet(
            signUrl,
            '/authRequired/getFirst',
            optionWithAccessToken(),
        );
        const data = await signature.json();
        console.log(data);
        const signatureId = data._id;
        const documentId = doc._id;
        const signRes = await post(
            mqUrl,
            'authRequired/signDocument',
            { documentId, signatureId },
            optionWithAccessToken(),
        );
        console.log(signRes);
        setLoading(false);
    };

    // Handle click on document to fetch PDF URL
    const handleDocOnClick = async (event, doc) => {
        event.stopPropagation();
        const option = optionWithAccessToken();
        console.log(doc._id);
        const response = await fetchGet(
            docUrl,
            `authRequired/getSignedUrl/${doc._id}`,
            option,
        );
        const data = await response.json();
        console.log(data.url);
        setPdfUrl(data.url); // Lưu URL của file PDF vào state
        setIsModalOpen(true); // Mở modal để hiển thị PDF
    };

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const option = optionWithAccessToken();
                const response = await get(
                    docUrl,
                    'authRequired/getAllSignedDoc',
                    option,
                );

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
                                onClick={(event) =>
                                    handleDocOnClick(event, doc)
                                }
                            >
                                <Image
                                    className={cx('card-image')}
                                    src={
                                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR202VPZfMD9kdS4yqx2x8aeg6DYlFypnBNBA&s'
                                    }
                                />
                                <div>
                                    <div className={cx('card-header')}>
                                        <h3 className={cx('card-title')}>
                                            {doc.fileName}
                                        </h3>
                                        <div className={cx('options-button')}>
                                            <button
                                                className={cx('options-btn')}
                                            >
                                                ...
                                            </button>
                                            <div
                                                className={cx('options-menu')}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <ul>
                                                    <li
                                                        onClick={() =>
                                                            handleSign(doc)
                                                        }
                                                    >
                                                        Sign
                                                    </li>
                                                    <li
                                                        onClick={() =>
                                                            handleShare(doc)
                                                        }
                                                    >
                                                        Share
                                                    </li>
                                                    <li
                                                        onClick={(event) =>
                                                            handleDelete(
                                                                event,
                                                                doc,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={cx('card-description')}>
                                        This is a placeholder card in the grid
                                        layout.
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No documents available</p>
                    )}
                </div>

                {/* Modal (File Viewer) */}
                {isModalOpen && (
                    <ModalPDF
                        url={pdfUrl}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}

                {loading && <Loading />}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Signed;
