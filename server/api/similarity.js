module.exports = function (lista, listb) {
  // 交集 list
  const intersection = lista.filter(v => listb.includes(v))
  // 并集 list
  const union = new Set(lista.concat(listb))
  // 算相似度
  return (intersection.length / union.size).toFixed(4)
}
