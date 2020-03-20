import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://budgeting-app-test-mode.firebaseio.com/'
});

export default instance;