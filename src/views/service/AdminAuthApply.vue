<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">관리자권한 신청</h2>
        <span class="h2_desc">사업자등록증 제출이 필요하며, 운영자 심사 후 권한이 변경됩니다.</span>
      </div>
      <!-- 처음 신청하는게 아닌 승인결과가 있거나 재신청 하는경우에 띄워줘야함(승인결과) -->
      <section class="sec_form" v-show="descrViewFlag">
        <div class="title_area left" v-if="authorityData.status === 'DELETED'">
          <h3 class="h3_title">승인결과</h3>
        </div>
        <table class="tbl_row_type" v-if="authorityData.status === 'DELETED'">
          <caption>
            <strong>승인결과</strong>
            <p>승인상태</p>
          </caption>
          <colgroup>
            <col style="width:190px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">승인상태</th>
              <td>
                {{authorityData ? authorityData.aprvRetNm : ''}}
                <span class="text_desc">{{ authorityData ? authorityData.aprvReqDt : ''}}</span>
              </td>
            </tr>
            <tr>
              <th scope="row">사유</th>
              <td>{{ authorityData ? authorityData.aprvRetDescr : ''}}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title">기업 정보</h3>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>기업정보</strong>
            <p>사업자등록번호, 업체명, 사업자등록증</p>
          </caption>
          <colgroup>
            <col style="width:190px">
            <col style="width:440px">
            <col style="width:190px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                사업자등록번호
                <span class="require">*</span>
              </th>
              <td>{{this.userCropInfoData.corpRegiNum | prettyCorpRegiNum}}</td>
              <th scope="row">
                업체명
                <span class="require">*</span>
              </th>
              <td>{{this.userCropInfoData.name}}</td>
            </tr>
            <tr>
              <th scope="row">
                사업자등록증
                <span class="require">*</span>
              </th>
              <td colspan="3">
                <div class="box_add_file">
                  <el-upload ref="enterpriseRegiFileUpload" action="https://jsonplaceholder.typicode.com/posts/" :on-change="onRegiFileChange" :file-list="regiFileList" :auto-upload="false" class="i_block">
                    <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
                  </el-upload>
                  <span v-show="!regiFileDescFlag" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
                  <span v-show="regiFileDisplayFlag" class="text_desc add_file">
                    {{certiFileNm}}
                    <a href="javascript:void(0);" class="btn_delete" @click="regiFileBeforeRemove">
                      <span>삭제</span>
                    </a>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section class="sec_form">
        <div class="title_area left inline">
          <h3 class="h3_title">담당자 정보</h3>
          <span class="h3_desc">※ 담당자정보가 변경된 경우 내 정보관리에서 정보를 수정해주세요. 승인 결과가 입력된 휴대폰번호와 이메일로 발송됩니다.</span>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>담당자정보</strong>
            <p>아이디, 이름, 휴대폰인증, 추가 연락처, 담당자 이메일</p>
          </caption>
          <colgroup>
            <col style="width:190px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">아이디 <span class="require">*</span></th>
              <td>{{this.userInfoData.userId}}</td>
            </tr>
            <tr>
              <th scope="row">이름 <span class="require">*</span></th>
              <td>{{this.userInfoData.userNm}}</td>
            </tr>
            <tr>
              <th scope="row">휴대폰인증 <span class="require">*</span></th>
              <td>{{this.userInfoData.mblNum | prettyMobile}}</td>
            </tr>
            <tr>
              <th scope="row">추가 연락처</th>
              <td>
                {{this.userInfoData.corpTelNum | prettyMobile}} 내선번호
                <span>{{this.userInfoData.corpTelExt}}</span>
              </td>
            </tr>
            <tr>
              <th scope="row">담당자 이메일 <span class="require">*</span></th>
              <td>{{this.userInfoData.email}}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- 2019.09.19 버튼 색상 bd_blue, blue 로 수정 -->
      <div class="btn_wrap center mar_t40" v-if="!descrViewFlag">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel">
          <span>취소</span>
        </a>
        <a href="javascript:void(0);" class="btn mid blue" @click="apply">
          <span>신청</span>
        </a>
      </div>
      <div class="btn_wrap center mar_t40" v-if="descrViewFlag">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel">
          <span>대시보드로 이동</span>
        </a>
        <a href="javascript:void(0);" class="btn mid blue" @click="apply">
          <span>재신청</span>
        </a>
      </div>
    </article>
  </div>
</template>
<script>
import { retrieveMyInfo } from '@/api/utility/utility'
import {
  memberAdminAuthority,
  memberAdminAuthorityApply
} from '@/api/service/service'

export default {
  name: '',
  components: {},
  data() {
    return {
      userInfoData: {
        userId: '',
        userNm: '',
        mblNum: '',
        corpTelNum: '',
        corpTelExt: '',
        email: ''
      },
      userCropInfoData: {
        corpRegiNum: '',
        name: '',
        corpCerti: null
      },
      certiFileNm: '',
      regiFileList: [],
      authorityData: {}
    }
  },
  computed: {
    regiFileDisplayFlag() {
      return !jglib.isEmpty(this.certiFileNm)
    },
    regiFileDescFlag() {
      return !jglib.isEmpty(this.certiFileNm)
    },
    descrViewFlag() {
      if (jglib.isEmpty(this.authorityData)) {
        return false
      }
      return !jglib.isEmpty(this.authorityData.certiFileId)
    }
  },
  watch: {},
  created() {
    let reqCorpId = {
      corpId: this.$store.state.user.corpId
    }
    memberAdminAuthority(reqCorpId).then(res => {
      this.authorityData = res.result
    })
    let reqData = {
      userId: this.$store.state.user.userId
    }
    retrieveMyInfo(reqData).then(res => {
      let {
        userId,
        userNm,
        mblNum,
        corpTelNum,
        corpTelExt,
        email,
        corpRegiNum,
        certiFileName,
        name
      } = res.result
      this.userInfoData.userId = userId
      this.certiFileNm = certiFileName
      this.userInfoData.userNm = userNm
      this.userInfoData.mblNum = mblNum
      this.userInfoData.corpTelNum = corpTelNum
      this.userInfoData.corpTelExt = corpTelExt
      this.userInfoData.email = email
      this.userCropInfoData.corpRegiNum = corpRegiNum
      this.userCropInfoData.name = name
    })
  },
  mounted() {},
  methods: {
    // 사업자등록증 업로드 관련 함수
    onRegiFileChange(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff'], 5)
      if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.regiFileRemove()
        this.regiFileList.push(files)
        this.certiFileNm = file.raw.name
      }
    },
    regiFileRemove() {
      this.regiFileList = []
      this.certiFileNm = ''
    },
    regiFileBeforeRemove() {
      let fileNm = this.regiFileList.length === 0 ? this.certiFileNm : this.regiFileList[0].name
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(() => {
          this.regiFileRemove()
        })
    },
    apply() {
      if (jglib.isEmpty(this.certiFileNm)) {
        this.$alertMsg('사업자 등록증을 업로드 해 주세요.')
        return
      }
      this.$confirmMsg(
        `관리자 권한 신청이 완료되었습니다.
      운영자 심사를 거쳐 승인이 완료된 후에 관리자 권한으로 변경됩니다. (승인 결과는 문자(SMS), 이메일 알림)`
      )
        .then(() => {
          let formData = new FormData()
          formData.append(
            'data',
            JSON.stringify({ corpId: this.$store.state.user.corpId })
          )
          formData.append('certiFile', this.regiFileList[0])
          memberAdminAuthorityApply(formData).then(() => {
            this.$router.push('/service/dashboard')
          })
        })
        .catch(() => {})
    },
    cancel() {
      this.$confirmMsg('관리자 권한 신청을 중단하시겠습니까?')
        .then(() => {
          this.$router.push('/service/dashboard')
        })
        .catch(() => {})
    }
  }
}
</script>
<style>
</style>
