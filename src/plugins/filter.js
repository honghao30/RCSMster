const FilterPlugin = {
  install: function(Vue, options) {
    Vue.filter('prettyCorpRegiNum', function(value) {
      if (jglib.isEmpty(value)) {
        return ''
      }

      return jglib.corpRegiNumConverter(value)
    })

    Vue.filter('prettyMobile', function(value) {
      if (jglib.isEmpty(value)) {
        return ''
      }
      return jglib.mobileNumConverter(value)
    })

    Vue.filter('prettyDate', function(value, format) {
      if (jglib.isEmpty(value)) {
        return ''
      }

      return jglib.convertDateFormat(value, format)
    })

    Vue.filter('prettyFileSize', function(value) {
      if (jglib.isEmpty(value)) {
        return '0'
      }

      return jglib.convertFileSizeByte(value)
    })

    Vue.filter('prettyNumber', function(value) {
      return jglib.convertNumberWithComma(value)
    })

    Vue.filter('prettyCharacter', function(value) {
      return jglib.unescapeHtml(value)
    })
  }
}
export default FilterPlugin
