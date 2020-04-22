import JSZip from 'jszip'
import FileSaver from 'file-saver'

import { request } from '../net/request'
import baseurl from '../api/baseurl'

/**
 * 批量打包zip包下载
 * @param urlArr Array [{url: 下载文件的路径, fileName: 下载文件名称}]
 * @param filename zip文件名
 */
export const download = (urlArr, filename = '音乐下载') => {
  if (urlArr.length === 1) {
    return request({
      baseURL: baseurl.local,
      method: 'get',
      url: '/song',
      params: {
        id: urlArr[0].songId
      },
      responseType: 'arraybuffer'
    }).then(response => {
      FileSaver.saveAs(new Blob([response.data]), urlArr[0].fileName)
    }).catch(err => {
      console.log(err)
    })
  }
  const zip = new JSZip()
  const cache = {}
  const promises = []
  urlArr.forEach((item) => {
    const promise = request({
      baseURL: baseurl.local,
      method: 'get',
      url: '/song',
      params: {
        id: item.songId
      },
      responseType: 'arraybuffer'
    }).then(response => { // 下载文件, 并存成ArrayBuffer对象
      zip.file(item.fileName, response.data, { binary: true }) // 逐个添加文件
      cache[item.fileName] = response.data
    })
    promises.push(promise)
  })

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then((content) => { // 生成二进制流
      FileSaver.saveAs(content, `${filename}.zip`) // 利用file-saver保存文件
    })
  })
}
