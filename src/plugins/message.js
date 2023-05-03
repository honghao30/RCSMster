const MessagePlugin = {
  install: function(Vue, options) {
    Vue.prototype.$confirmMsg = function(
      message,
      title,
      okButtonText,
      cancelButtonText
    ) {
      return this.$confirm(message, title || '', {
        confirmButtonText: okButtonText || '확인',
        cancelButtonText: cancelButtonText || '취소',
        dangerouslyUseHTMLString: true,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        lockScroll: false
      })
    }

    Vue.prototype.$alertMsg = function(message, title, okButtonText) {
      return new Promise((resolve, reject) => {
        this.$alert(message, title || '안내', {
          confirmButtonText: okButtonText || '확인',
          dangerouslyUseHTMLString: true,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          lockScroll: false,
          callback: action => {
            resolve('confirm')
          }
        })
      })
    }
  }
}
export default MessagePlugin
