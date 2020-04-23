export default function (data) {
  data = data.result.songs
  const resultList = []
  data.forEach(item => {
    resultList.push({
      songId: item.id,
      songName: item.name,
      songCover: item.artists[0].picUrl,
      singer: item.artists[0].name
    })
  })
  return resultList
}
