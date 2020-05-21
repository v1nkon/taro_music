import Taro from '@tarojs/taro'


export default async function fetch(options) {
  const { url, data, method = 'GET', showToast = true, autoLogin = true } = options
  const token = ''
  const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }
  Taro.showLoading({
    title: "加载中"
  })
  return Taro.request({
    url,
    method,
    data,
    header
  }).then(async (res) => {
    Taro.hideLoading()
    const data = res.data
    return data
  }).catch((err) => {
    Taro.hideLoading()
    return Promise.reject({ message: "错误", ...err })
  })
}