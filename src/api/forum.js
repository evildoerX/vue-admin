import { createApi, createNetWork } from './network'

const DOMAIN = 'http://idg-preprod.tunnel.nibaguai.com';
const BASE_URL = `${DOMAIN}/forum/main.php/json/`;

export const getforumList = params => { 
	return createApi('http://idg-preprod.tunnel.nibaguai.com/forum/main.php/json/forum/all',
		params
	)
};