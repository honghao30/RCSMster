<template>
  <div>
    <div class="box_add_file col_11">
      <div class="drag_files_area mar_t15">
        <!-- 파일업로드 -->
        <el-upload
          class="upload-demo"
          drag
          action
          :on-change="handleChange"
          :auto-upload="false"
          multiple
        >
          <span class="btn sml bd_black">
            <span>파일선택</span>
          </span>
          <!-- drag and drop 영역 내 표시되는 내용 -->
          <span class="text_desc">
            파일형식 : jpg, png, tiff, pdf, doc, ppt, pptx, xls, xlsx, hwp (
            <em
              class="file_size"
            >{{ totalSize | prettyFileSize }}</em>
            MB/{{ maxSize }})
          </span>
          <p class="write_drag_here">
            <span>
              <em class="icon_attach"></em>마우스로 파일을 끌어다 놓으세요.
            </span>
          </p>
        </el-upload>
      </div>
    </div>
    <div class="upload_files_area mar_t15 col_11">
      <div class="upload_file_list">
        <ul>
          <li v-for="(file, index) in fileList" :key="`file_${file.uid}`">
            <span>
              {{ file.name }}(
              <em class="file_size">{{ file.size | prettyFileSize }}</em>)
            </span>
            <a href="javascript:void(0);" class="btn_delete" @click="deleteFile(index)">
              <span>삭제</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnlineQnaFormInfoFileUpload',
  props: {
    fileExt: {
      type: Array,
      default() {
        return [
          'jpg',
          'png',
          'pdf',
          'doc',
          'ppt',
          'pptx',
          'hwp',
          'xls',
          'xlsx',
          'zip'
        ]
      }
    },
    maxSize: {
      type: String,
      default: '50MB'
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    totalSize() {
      let size = 0

      this.fileList.map(f => {
        size += f.size
      })

      return size
    },
    maxSizeByte() {
      return this.convertFileSizeStringToByte(this.maxSize)
    },
    fileExtString() {
      return this.fileExt.join(', ')
    }
  },
  watch: {
    fileList() {
      this.handleChangeFileList()
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleChange(file, fileList) {
      // limit
      if (this.fileList.length + 1 > this.limit) {
        this.$emit('exceed-limit', { limit: this.limit })
        return false
      }

      // check uploaded file size
      if (file.size + this.totalSize > this.maxSizeByte) {
        this.$emit('exceed', {
          maxSize: this.maxSizeByte,
          exceedSize: file.size + this.totalSize
        })
        return false
      }

      // check uploaded file extension
      if (
        !new RegExp(
          '(' +
            this.fileExt
              .join('|')
              .toLocaleLowerCase()
              .replace(/\./g, '\\.') +
            ')$'
        ).test(file.name.toLocaleLowerCase())
      ) {
        this.$emit('invalid-ext', {
          fileExt: file.name.substr(file.name.lastIndexOf('.') + 1),
          ableExtension: this.fileExtString
        })
        return false
      }

      this.fileList.push(file.raw)
    },
    deleteFile(index) {
      this.fileList.splice(index, 1)
    },
    convertFileSizeStringToByte(value) {
      let num = value.replace(/[^0-9]/g, '')
      let byte = num

      if (value.toUpperCase().indexOf('MB')) {
        byte = num * 1024 * 1024
      } else if (value.toUpperCase().indexOf('KB')) {
        byte = num * 1024
      }

      return byte
    },
    handleChangeFileList() {
      this.$emit('change', this.fileList)
    }
  }
}
</script>

<style>
</style>
