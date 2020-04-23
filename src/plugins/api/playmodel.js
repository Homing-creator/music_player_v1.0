import random from './random'

function sequence (index, length, flag) {
  if (flag) {
    return index === length - 1 ? -1 : index + 1
  } else {
    console.log(index)
    return index === 0 ? -1 : index - 1
  }
}

function circulation (index, length, flag) {
  return index
}

function listloop (index, length, flag) {
  if (flag) {
    return (index + 1) % length
  } else {
    return (index + length - 1) % length
  }
}

function randomplay (index, length, flag) {
  let resultNum = random(0, length - 1)
  while (resultNum === index) {
    resultNum = random(0, length - 1)
  }
  return resultNum
}

export default {
  sequence,
  circulation,
  listloop,
  randomplay
}
