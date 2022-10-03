import axios from 'axios';

const axiosOut = axios.create({
  timeout: 30000,
});

axiosOut.defaults.timeout = 60000;

export default axiosOut;
