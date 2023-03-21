import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './constants';

const token = Cookies.get('access_token');

const axiosWithAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default axiosWithAuth;
