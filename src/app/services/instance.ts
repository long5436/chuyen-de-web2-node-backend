import axios, { Axios } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseURL: string = process.env.API_FOOTBALL || '';
const token: string = process.env.API_TOKEN || '';

const instance: Axios = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'X-Auth-Token': token,
  },
});

export default instance;
