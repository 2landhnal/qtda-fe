import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { del, get, post } from '../../utils/httpRequests';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadFileOpen, setuploadFileOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null); // state để lưu URL của PDF

    const handleDelete = () => {
        console.log('Delete');
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
        const docName = doc.fileName;
        const signRes = await post(
            mqUrl,
            'authRequired/signDocument',
            { documentId, signatureId, docName },
            optionWithAccessToken(),
        );
        console.log(signRes);
        setLoading(false);
        toast.success('Signed successfully!', { autoClose: 3000 });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!file) {
            alert('Please select a PDF file before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        const option = optionWithAccessToken();

        try {
            const response = await fetchPost(
                docUrl,
                '/authRequired/upload',
                formData,
                option,
            );

            if (response.ok) {
                alert(`File uploaded successfully: ${response}`);
            } else {
                alert(`Failed to upload file: ${response.status}`);
            }
            toast.success('Upload successfully!', { autoClose: 3000 });
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
        setLoading(false);
    };

    // Handle click on document to fetch PDF URL
    const handleDocOnClick = async (event, doc) => {
        event.stopPropagation();
        const option = optionWithAccessToken();
        console.log(doc._id);
        const response = await fetchGet(
            docUrl,
            `authRequired/permissionRequired/getUrl/${doc._id}`,
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
                    '/authRequired/getOwnDocs',
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
                                <div className={cx('card-header')}>
                                    <h3 className={cx('card-title')}>
                                        {doc.fileName}
                                    </h3>
                                    <div className={cx('options-button')}>
                                        <button className={cx('options-btn')}>
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                            />
                                        </button>
                                        <div
                                            className={cx('options-menu')}
                                            onClick={(e) => e.stopPropagation()}
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
                                                    onClick={() =>
                                                        handleDelete(doc)
                                                    }
                                                >
                                                    Delete
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <p className={cx('card-description')}>
                                        This is a placeholder card in the grid
                                        layout.
                                    </p> */}
                            </div>
                        ))
                    ) : (
                        <p>No documents available</p>
                    )}
                </div>

                {/* Floating Button */}
                <button
                    className={cx('floatingButton')}
                    onClick={() => setuploadFileOpen(true)}
                >
                    +
                </button>

                {/* Modal (File Upload) */}
                {uploadFileOpen && (
                    <div className={cx('modalOverlay')}>
                        <div className={cx('modalContent')}>
                            <h3>Upload a File</h3>
                            <form onSubmit={handleSubmit}>
                                <div class={cx('drop_box')}>
                                    <header>
                                        <h4>Select File here</h4>
                                    </header>
                                    <p>Files Supported: PDF</p>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    <div className={cx('modalActions')}>
                                        <button type="submit">Upload</button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setuploadFileOpen(false)
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

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

export default Home;
