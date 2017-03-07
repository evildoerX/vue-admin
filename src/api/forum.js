import axios from 'axios';

let base = 'oneitfarm.com';

export const getforumList = params => { return axios.get(`http://oneitfarm.com/forum/main.php/json/forum/all`, { params: params }); };