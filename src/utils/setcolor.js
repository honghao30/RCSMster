export function getContrast(hexcolor) {
  const r = parseInt(hexcolor.substring(1, 3), 16)
  const g = parseInt(hexcolor.substring(3, 5), 16)
  const b = parseInt(hexcolor.substring(5, 7), 16)
  const bgcolor = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (bgcolor >= 128) ? 'black' : 'white'
}

/* import
watch: {
  brandColor(newColor) {
    this.fontColor = getContrast(newColor)
  }
},
mounted() {
  this.executeGetContrast(this.brandColor)
},
methods: {
  executeGetContrast(hexcolor) {
    this.fontColor = getContrast(hexcolor)
  }
}
*/
