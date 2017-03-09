import axios from 'axios'
import qs from 'qs'
// import md5 from 'blueimp-md5'
// import * as types from '../consts'
// import { filterObject } from './../utils'
// import store from './../store'
// import { DEV_USER_INFO } from '../../config/dev.consts.js'
// function createParams (params) {
//   if (params.appkey && params.channel)  
//   	var { appkey, channel } = params
//   else if (store.state.user.userInfo) 
//   	var { appkey, channel } = store.state.user.userInfo
//   else 
//   	var { appkey, channel } = DEV_USER_INFO
//   const token = md5(`${types.API_TOKEN}_appkey_${appkey}_channel_${channel}`)
//   params.token = token
//   if (!params.appkey && !params.channel) {
//     params.appkey = appkey
//     params.channel = channel
//   }
//   // filter "" null undef
//   return filterObject(params)
// }
export function createApi (url, params) {
  // const realParams = createParams(params)
  return new Promise((resolve, reject) => {
    // store.commit(types.START_FETCH)
    axios.post(url, qs.stringify(params), {
      timeout: 10000
    }).then((response) => {
      const res = response.data
      if (!res) {
        reject({ message: '请求结果为空' })
      } else if (typeof res !== 'object') {
        reject({ message: '服务端返回异常' })
      } else if (res.ret === -1) {
        res.message = res.msg
        reject(res)
      } else {
        resolve(res)
      }
      // store.commit(types.END_FETCH)
    })
    .catch((error) => {
      console.log(error)
      if (axios.isCancel(error)) {
      } else {
        reject({ message: '网络请求失败' })
      }
      // store.commit(types.END_FETCH)
    })
  })
}
export function createNetWork (url, params) {
  // const realParams = createParams(params)
  axios.post(url, qs.stringify(realParams), {
    timeout: 10000
  })
  .then((response) => {
  })
  .catch((error) => {
  })
}