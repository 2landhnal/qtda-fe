import { joinUrl } from './helper';

export const fetchGet = async (base, path, options = {}) => {
    try {
        options.headers = options.headers || {};
        const response = await fetch(joinUrl(base, path), {
            method: 'GET',
            headers: options.headers || {},
        });
        return response;
    } catch (error) {
        console.error(`GET request failed: ${error}`);
        throw error;
    }
};

export const fetchPost = async (base, path, body = {}, options = {}) => {
    try {
        const response = await fetch(joinUrl(base, path), {
            method: 'POST',
            headers: options.headers || {},
            body,
        });
        return response;
    } catch (error) {
        console.error(`POST request failed: ${error}`);
        throw error;
    }
};

export const fetchPut = async (base, path, body = {}, options = {}) => {
    try {
        const response = await fetch(joinUrl(base, path), {
            method: 'PUT',
            headers: options.headers || {},
            body,
        });
        return response;
    } catch (error) {
        console.error(`PUT request failed: ${error}`);
        throw error;
    }
};

export const fetchDelete = async (base, path, options = {}) => {
    try {
        const response = await fetch(joinUrl(base, path), {
            method: 'DELETE',
            headers: options.headers || {},
        });
        return response;
    } catch (error) {
        console.error(`DELETE request failed: ${error}`);
        throw error;
    }
};
