import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rsk-budgeting-app.firebaseio.com/'
});

export default instance;