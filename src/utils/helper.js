import classNames from 'classnames/bind';
import { post } from './httpRequests.js';
import { authUrl } from '../config/index.js';
import urlJoin from 'url-join';

const base64regex =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export const joinUrl = (base, path) => {
    return urlJoin(base, path);
};

export function classCombine(names, cx) {
    const classArray = names.split(' '); // Split the input string into an array
    const res = classNames(names, ...classArray.map((name) => cx(name))); // Use spread operator to combine class names
    return res;
}

export const optionWithAccessToken = () => {
    return {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    };
};

export const optionWithRefreshToken = () => {
    return {
        headers: {
            authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
    };
};

export const isTokenExpired = (token) =>
    Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000;

export const isAccessTokenExpired = () =>
    Date.now() >=
    JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).exp *
        1000;
export const checkCredential = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (
        !accessToken ||
        !refreshToken ||
        refreshToken == 'undefined' ||
        accessToken == 'undefined'
    ) {
        console.log('No token found');
        return false;
    }
    if (isTokenExpired(accessToken)) {
        console.log('Access token expired, trying to get a new one');
        try {
            const options = optionWithRefreshToken();
            const response = await post(
                authUrl,
                '/refreshAccessToken',
                {},
                options,
            );
            console.log(response);
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                console.log('Get new token success');
                return true; // Token refreshed successfully
            }
            console.log('Get new token failed');
            return false;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return false; // Failed to refresh token
        }
    } else {
        console.log('Access token valid');
        return true;
    }
};
