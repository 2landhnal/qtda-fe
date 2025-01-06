import React, { useState } from 'react';
import styles from './Verify.module.scss';
import { authUrl, docUrl } from '../../config';
import { post } from '../../utils/httpRequests';
import classNames from 'classnames/bind';
import { fetchPost } from '../../utils/fetch';
import Loading from '../../components/Loading';
import Result from './result';

const cx = classNames.bind(styles);

function FileUploadForm() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [infor, setInfor] = useState(false);

    const handleFileChange = (e) => {
        console.log(e.target.files[0]); // this one okay
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (!file) {
            alert('Please select a PDF file before submitting.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetchPost(docUrl, '/verify', formData);

            if (response.ok) {
                const result = await response.json();
                setShowResult(true);
                setIsValid(result.isValid);
                setInfor(result.obj);
            } else {
                setShowResult(true);
                setIsValid(false);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setShowResult(true);
            setIsValid(false);
        }
        setLoading(false);
    };

    return (
        <div className={cx('form-container')}>
            <div className={cx('upload-container')}>
                <div className={cx('content-wrapper')}>
                    {/* File Display Box */}
                    <div className={cx('file-box')}>
                        <p className={cx('file-name')}>
                            {file ? file.name : 'filename.pdf'}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className={cx('button-group')}>
                        <label className={cx('button', 'select-button')}>
                            Select File
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf"
                            />
                        </label>

                        <button
                            onClick={handleSubmit}
                            className={cx(
                                'button',
                                'check-button',
                                !file ? 'disabled' : '',
                            )}
                            disabled={!file}
                        >
                            Check
                        </button>
                    </div>
                </div>
            </div>
            {showResult && (
                <Result
                    isValid={isValid}
                    infor={infor}
                    onClose={() => setShowResult(false)}
                />
            )}
            {loading && <Loading />}
        </div>
    );
}

export default FileUploadForm;
