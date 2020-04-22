// {...
//   result: [{
//       id,
//       name,
//       picUrl,
//       song: {
//         artists: [{
//             name // 歌手
//           }]
//       }
//     }]
// ...}

export const parseNetRecommondData = function (data) {
  const result = []
  data = data.result
  data.forEach(item => {
    result.push({
      songId: item.id,
      songName: item.name,
      songCover: item.picUrl,
      singer: item.song.artists[0].name
    })
  })
  return result
}

export const parseCollectionListData = function (data) {
  const resultList = []
  data.forEach(item => {
    const { singer, songCover, songId, songName } = item
    resultList.push({ songId, songName, songCover, singer })
  })
  return resultList
}
