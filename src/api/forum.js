import { createApi, createNetWork } from './network'

const DOMAIN = `http://idg-preprod.tunnel.nibaguai.com`;
const BASE_URL = `${DOMAIN}/forum/main.php/json/`;

export const getforumList = params => { 
	return createApi(`${BASE_URL}forum/all`,
		params
	)
};
export const getsubforumList = params => { 
	return createApi(`${BASE_URL}subforum/all`,
		params
	)
};