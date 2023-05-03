import xlsx from 'xlsx'

const xlsxUtils = {
  filename: '',
  data: [],
  header: [],
  options: {},
  visibleDataOrder: [],
  instance: undefined,
  createInstance() {
    return new Promise((resolve, reject) => {
      this.instance = document.createElement('table')
      resolve()
    })
  },
  createHeader() {
    return new Promise((resolve, reject) => {
      let header = []
      if (!Array.isArray(this.header[0])) {
        header.push(this.header)
      } else {
        header = this.header
      }

      let thead = document.createElement('thead')
      for (let row of header) {
        let tr = document.createElement('tr')
        for (let h of row) {
          let rowspan = h.rowspan || '1'
          let colspan = h.colspan || '1'
          let th = document.createElement('th')
          th.setAttribute('rowspan', rowspan)
          th.setAttribute('colspan', colspan)
          th.innerText = h.name
          tr.appendChild(th)
        }
        thead.appendChild(tr)
      }
      this.instance.appendChild(thead)
      resolve()
    })
  },
  createDataRows() {
    return new Promise((resolve, reject) => {
      let tbody = document.createElement('tbody')

      for (let row of this.data) {
        let tr = document.createElement('tr')
        for (let cellkey of this.visibleDataOrder) {
          let td = document.createElement('td')
          td.innerText = row[cellkey]
          tr.appendChild(td)
        }
        tbody.appendChild(tr)
      }
      this.instance.appendChild(tbody)
      resolve()
    })
  },
  getVisibleDataOrder() {
    let dataOrder = []
    if (Array.isArray(this.options.dataOrder)) {
      dataOrder = this.options.dataOrder
    } else if (this.options.dataOrder === 'header') {
      for (let h of this.header) {
        dataOrder.push(h.key)
      }
    } else {
      dataOrder = Object.keys(this.data[0])
    }
    this.visibleDataOrder = dataOrder
  },
  export(data, filename, options) {
    this.data = data
    this.filename = filename
    this.header = options.header
    this.options = options

    this.getVisibleDataOrder()
    return new Promise((resolve, reject) => {
      this.createInstance().then(() => {
        this.createHeader().then(() => {
          this.createDataRows().then(() => {
            this.exportTableToXlsx()
            resolve()
          })
        })
      })
    })
  },
  exportTableToXlsx() {
    let config = { raw: true, type: 'string' }
    let ws = xlsx.utils.table_to_sheet(this.instance, config)
    let wb = xlsx.utils.book_new()

    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1')
    xlsx.writeFile(wb, this.filename)
  }
}

export default xlsxUtils
