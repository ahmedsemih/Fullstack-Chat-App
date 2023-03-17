import axios from "axios";
import { API_BASE_URL } from '../utils/constants';

export const createAccount = async ({ email, username, password }: signFormType) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            username,
            password
        });

        return data;
    } catch {
        return { statusCode: '409', message: 'User already exists.' };
    }
}

export const logIn = async ({ email, password }: signFormType) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password
        });
        return data;

    } catch {
        return { statusCode: '401', message: 'Wrong email or password.' }
    }
}