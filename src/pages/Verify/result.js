import styles from './Result.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import { useEffect, useState } from 'react';
import { authUrl, signUrl, userUrl } from '../../config';
import { fetchGet } from '../../utils/fetch';

const cx = classNames.bind(styles);
function Result({ isValid, infor, onClose }) {
    const [signerInfor, setSignerInfor] = useState({});
    useEffect(() => {
        const getSigner = async () => {
            let account = await fetchGet(
                signUrl,
                `/getSigner/${infor.signatureId}`,
            );
            account = await account.json();
            console.log(account.accountId);
            let username = await fetchGet(
                authUrl,
                `/getUsername/${account.accountId}`,
            );
            username = await username.json();
            let user = await fetchGet(
                userUrl,
                `/getBasicInfor/${username.username}/${account.accountId}`,
            );
            user = await user.json();
            user = user._doc;
            console.log(user);
            setSignerInfor(user);
        };
        if (isValid && infor) getSigner();
    }, []);
    console.log(isValid);
    return (
        <div className="darkCover">
            <div className={cx('overlay')}>
                <div className={cx('content')}>
                    <div className={cx('text')}>
                        {isValid
                            ? 'Your document was signed!'
                            : 'Your document was not signed!'}
                    </div>
                    {isValid && (
                        <div>
                            <Image
                                //customFallback="https://cdnb.artstation.com/p/assets/images/images/034/851/195/large/emmanuel-shiu-onelasttime.jpg?1613415794"
                                className={cx('user-avatar')}
                                src="https://1.bp.blogspot.com/-VqNv4Rvn--4/XGJDujZsqmI/AAAAAAAA4As/mechGLfszq4qorJe3nW5s78VHFBpgePnQCLcBGAs/s1600/t%2526j07.jpg"
                                alt="Cao Bao Nguyen"
                            />
                            <div className={cx('text')}>
                                Signed by {signerInfor.fullName}
                            </div>
                        </div>
                    )}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Result;
