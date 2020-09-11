import axios from 'axios';

const instance = axios.create({
  baseURL: "https://react-burger-fb0ba.firebaseio.com/"
});

export default instance;