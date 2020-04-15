function formatTime (time) {
  if (time < 10) {
    return '0' + time
  } else {
    return time + ''
  }
}

export default function (number) {
  const time = number
  const m = Math.floor(time / 60)
  const s = (time - m * 60).toFixed(0)
  return formatTime(m) + ':' + formatTime(s)
}
