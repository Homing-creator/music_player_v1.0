module.exports = function (lista, listb) {
  // 交集 list
  const intersection = lista.filter(v => (new Set(listb)).has(v))
  // 并集 list
  const union = new Set(lista.concat(listb))
  // 算相似度
  return Math.ceil(intersection.length / union.size)
}
