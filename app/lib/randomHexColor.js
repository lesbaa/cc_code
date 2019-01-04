export default () => {
  const hex = '0123456789abcdef'.split('')
  return hex.reduce(
    (color, c, i) =>
      i > 5
        ? color
        : color + hex[~~(Math.random() * 16)]
    , '#')
}