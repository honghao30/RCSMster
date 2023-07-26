<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <h2 class="page-title">
          브랜드 홈
          <span class="flag-progress"
                :class="progressInfo.progress"
          >{{ progressInfo.displayValue }}</span>
        </h2>
        <div class="top-progress-area">
          <p class="date">최종변경 : {{getFormatDate(brandDetail.updateDate)}}</p>
          <p class="reject-text" v-if="rejected">반려사유 : {{ brandDetail.aprvRetDescr }} </p>
        </div>
        <div class="top-notice--gray">
          <p>-신청한 브랜드 정보는 운영자 심사를 거쳐 노출 여부가 결정되며 승인 결과는 문자메시지(SMS) 및 이메일로 알려드립니다.</p>
          <p>-승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</p>
        </div>
        <PageTitleH3 titleh3="기본 정보"/>
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="230px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 ID</span></th>
                <td>
                  <span class="text">{{ brandDetail.brandId }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 key</span></th>
                <td>
                  <span class="text">{{ brandDetail.brandKey }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드명</span></th>
                <td>
                  <span class="text">{{ brandDetail.name }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 소개</span></th>
                <td>
                  <span class="text">{{ brandDetail.description }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <span class="form-item__label">백그라운드 이미지</span>
                </th>
                <td>
                  <span class="text" v-if="bgFileInfo.isDefault">기본이미지<span class="division"></span>{{ bgFileInfo.value }}
                  </span>
                  <span class="text" v-else>{{ bgFileInfo.value }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <span class="form-item__label">프로필 이미지</span>
                </th>
                <td>
                  <span class="text" v-if="profileFileInfo.isDefault">기본이미지<span class="division"></span>{{ profileFileInfo.value }}
                  </span>
                  <span class="text" v-else>{{ profileFileInfo.value }}</span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">카테고리</span></th>
                <td>
                  <span class="text">
                    <template v-if="brandDetail.categoryName">
                      {{brandDetail.categoryName}}
                    </template>
                    <template v-if="brandDetail.subCategoryName">
                      <span class="division"></span>의류
                    </template>
                    <template v-if="brandDetail.categoryOpt">
                      <span class="division"></span>시스템 스튜디오
                    </template>
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">전화번호</span></th>
                <td>
                  <span class="text">
                    {{ brandDetail.tel }}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">이메일</span></th>
                <td>
                  <span class="text">
                    {{ brandDetail.email }}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">주소</span></th>
                <td>
                  <span class="text">
                    {{ brandDetail.zipCode }} {{ brandDetail.roadAddress }} {{ brandDetail.detailAddress }}
                  </span>
                </td>
              </tr>
              <tr>
                <th scope="row"><span class="form-item__label">브랜드 컬러</span></th>
                <td>
                  <div class="form-item__content">
                    <div class="form-item-row colunl-type">
                      <div class="input-item">
                        <span class="colorbox" :style="{ background: brandDetail.templateColor }"></span>
                        <span class="input">
                          {{brandDetail.templateColor}}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PageTitleH3 titleh3="퀵 버튼"/>
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="230px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">대화방</span></th>
                <td>
                  <span class="text"></span>
                </td>
              </tr>
              <tr v-for="(item, idx) in getMenus" :key="idx">
                <th scope="row"><span class="form-item__label">{{getMenuItemName(item.buttonType)}}</span></th>
                <td>
                  <span class="text">{{item.buttonType === 'call' ? brandDetail.tel : item.weblink}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PageTitleH3 titleh3="브랜드 홈 탭"/>
        <div class="table__wrap">
          <table class="table table-bodyonly form-table">
            <colgroup>
              <col width="230px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row"><span class="form-item__label">우선 노출 탭</span></th>
                <td>
                  <span class="text">{{this.brandDetail.initTab === 'FEED' ? '소식 탭 우선' : this.brandDetail.initTab === 'INFO' ? '정보 탭 우선' : ''}}</span>
                </td>
              </tr>
              <template v-if="brandDetail.initTab === 'FEED'">
                <template v-if="brandDetail.alimpanUseYn === 'Y'">
                  <tr>
                    <th scope="row" rowspan="3"><span class="form-item__label">알림판</span></th>
                    <td colspan="2">
                      <span class="text">사용</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">제목</span></th>
                    <td>
                      {{brandDetail.alimpanTitle}}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">내용</span></th>
                    <td>
                      {{brandDetail.alimpanContent}}
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <th scope="row"><span class="form-item__label">알림판</span></th>
                    <td colspan="2">
                      <span class="text">미사용</span>
                    </td>
                  </tr>
                </template>
                <tr v-for="(item, idx) in getMenus" :key="idx">
                  <th scope="row" :rowspan="brandDetail.menus.length" v-if="idx === 0"><span class="form-item__label">소식</span></th>
                  <th scope="row"><span class="form-item__label">{{getMenuItemName(item.buttonType)}}</span></th>
                  <td>
                    <span class="text">{{item.buttonType === 'call' ? brandDetail.tel : item.weblink}}</span>
                  </td>
                </tr>
              </template>
              <template v-if="brandDetail.initTab === 'INFO'">
                <tr>
                  <th scope="row" :rowspan="infoTabDataLength"><span class="form-item__label">노출정보</span></th>
                  <th scope="row"><span class="form-item__label">전화번호</span></th>
                  <td v-if="brandDetail.tel">
                    <span class="text">{{brandDetail.tel}}</span>
                  </td>
                </tr>
                <tr v-if="brandDetail.webSiteUrl">
                  <th scope="row"><span class="form-item__label">웹사이트</span></th>
                  <td>
                    <span class="text">{{brandDetail.webSiteUrl}}</span>
                  </td>
                </tr>
                <tr v-if="brandDetail.email">
                  <th scope="row"><span class="form-item__label">이메일</span></th>
                  <td>
                    <span class="text">{{brandDetail.email}}</span>
                  </td>
                </tr>
                <tr v-if="brandDetail.zipCode && brandDetail.roadAddress">
                  <th scope="row"><span class="form-item__label">주소</span></th>
                  <td>
                    <span class="text">{{brandDetail.zipCode}} {{brandDetail.roadAddress}} {{brandDetail.detailAddress}}</span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="button__wrap">
          <ButtonCmp
            type="btn-line"
            @click='checkBrandDelete'
          >삭제</ButtonCmp>
<!--          <ButtonCmp
            type="btn-blue-line"
          >승인 요청 취소</ButtonCmp>-->
          <ButtonCmp
            type="btn-blue"
            v-if="saved || rejected || ok"
            @click="goEdit"
          >수정</ButtonCmp>
        </div>
      </div>
      <div class="brand-aside sticky">
        <BrandEmulator :brandData="brandDetail" curTab="info"/>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import { mapActions, mapGetters } from 'vuex'
import jglib from '@/utils/jglib'
import {
  deleteApprovalBrand,
  getCheckBrandDelete
} from '@/api/service/approvalBrand'
import { brandDefaultImg } from '@/api/service/service'
import BrandLnb from '@/views/brand/components/BrandLnb.vue'

export default {
  components: {
    BrandLnb,
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandEmulator
  },
  data() {
    return {
      brandId: '',
      master: null,
      admYn: false,
      activeOk: false,

      // 승인상태값
      waiting: false,
      ok: false,
      rejected: false,
      saved: false,

      hasWebsite: false,
      hasEmail: false,
      hasAddr: false
    }
  },
  mounted() {
    this.brandId = this.$route.params.brandId
    this.fetchApprovalBrand({ brandId: this.brandId })
      .then(() => {
        const aprv = this.brandDetail
        this.master = this.brandDetail.masterBrandInfo
        this.admYn = aprv.admYn
        this.isActive = this.master.status === 'ACTIVE' && this.master.aprvRet === 'OK'
        this.activeOk = this.master.status === 'ACTIVE' && this.master.aprvRet === 'OK' && aprv.aprvRet === 'OK'
        this.corpId = aprv.corpId
        if (aprv.aprvRet === 'WAITING' || aprv.aprvRet === 'INSPECTED' || aprv.aprvRet === 'INSPECTING') {
          this.waiting = true
        } else if (this.master.aprvRet === 'OK') {
          this.ok = true
        } else if (aprv.aprvRet === 'REJECTED') {
          this.rejected = true
        } else if (aprv.aprvRet === 'SAVED') {
          this.saved = true
        }
        if (!jglib.isEmpty(aprv.webSiteUrl)) {
          this.hasWebsite = true
        }
        if (!jglib.isEmpty(aprv.email)) {
          this.hasEmail = true
        }
        if (!jglib.isEmpty(aprv.roadAddress)) {
          this.hasAddr = true
        }
        this.loadBrandDefaultImg()
      })
      .catch(err => {
        this.$alertMsg(err.desc)
        if (err.code === '64498') {
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
      })
  },
  computed: {
    ...mapGetters('brand', {
      brandDetail: 'getBrandDetail',
      fileInfo: 'getBrandFile'
    }),
    getMenus() {
      return this.brandDetail.menus.filter(m => m.buttonType !== 'app')
    },
    bgFileInfo() {
      return this.getImgFileInfo({
        fileId: this.brandDetail.bgImgFileId,
        fileNm: this.brandDetail.bgImgFileNm
      })
    },
    profileFileInfo() {
      return this.getImgFileInfo({
        fileId: this.brandDetail.profileImgFileId,
        fileNm: this.brandDetail.profileImgFileNm
      })
    },
    infoTabDataLength() {
      let length = 0

      if (!jglib.isEmpty(this.brandDetail.tel)) length++
      if (!jglib.isEmpty(this.brandDetail.webSiteUrl)) length++
      if (!jglib.isEmpty(this.brandDetail.email)) length++
      if (!jglib.isEmpty(this.brandDetail.zipCode) && !jglib.isEmpty(this.brandDetail.roadAddress)) length++

      return length
    },
    progressInfo() {
      const info = {
        progress: '',
        displayValue: ''
      }

      if (this.saved) {
        info.progress = ''
        info.displayValue = '임시저장'
      } else if (this.brandDetail.aprvRet === 'WAITING') {
        info.progress = 'weit'
        info.displayValue = '승인대기'
      } else if (this.waiting) {
        info.progress = 'ing'
        info.displayValue = '처리중'
      } else if (this.rejected) {
        info.progress = 'return'
        info.displayValue = '반려'
      } else if (this.ok) {
        info.progress = 'done'
        info.displayValue = '승인완료'
      }

      return info
    }
  },
  methods: {
    ...mapActions('brand', {
      fetchApprovalBrand: 'fetchApprovalBrand',
      setBrandDefaultImg: 'setBrandDefaultImg'
    }),
    getImgFileInfo(fileInfo) {
      const rst = {
        isDefault: false,
        value: fileInfo.fileNm
      }
      const idx = this.getDefaultImgFileIndexByFileId(fileInfo.fileId)
      if (idx !== -1) {
        rst.isDefault = true
        rst.value = this.fileInfo.defaultImg[idx].name
      }

      return rst
    },
    getDefaultImgFileIndexByFileId(fileId) {
      let fileIdx = -1
      this.fileInfo.defaultImg.forEach((img, idx) => {
        if (img.id === fileId) fileIdx = idx
      })
      return fileIdx
    },
    getFormatDate(dateValue) {
      return jglib.convertDateFormat(dateValue, 'YYYY. MM. DD')
    },
    goEdit() {
      this.$router.push({ name: 'editBrand', params: { brandId: this.brandDetail.brandId } })
    },
    getMenuItemName(item) {
      let nm = ''
      switch (item) {
        case 'call':
          nm = '전화번호'
          break
        case 'moreinfo':
          nm = '정보'
          break
        case 'order':
          nm = '주문'
          break
        case 'buy':
          nm = '구매'
          break
        case 'tickets':
          nm = '티켓'
          break
        case 'web':
          nm = '웹사이트'
          break
        case 'store':
          nm = '스토어'
          break
      }
      return nm
    },
    checkBrandDelete() {
      this.$alertMsg('작업 중')
      // let params = { brandId: this.brandId }
      // getCheckBrandDelete(params)
      //   .then(res => {
      //     const { tplYn, chatbotYn, agencyYn, managerYn } = res.result
      //     if (agencyYn === 'Y') {
      //       this.$alertMsg('브랜드에 계약된 대행사가 존재합니다. 대행사 계약 해지 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
      //     } else if (tplYn === 'Y') {
      //       this.$alertMsg('브랜드에 등록된 템플릿이 존재합니다. 템플릿 관리 탭에서 모든 목록을 삭제한 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
      //     } else if (chatbotYn === 'Y') {
      //       this.$alertMsg('브랜드에 등록된 발신번호가 존재합니다. 발신번호 관리 탭에서 모든 목록을 삭제한 후 브랜드를 삭제할 수 있습니다.', '타이틀', '확인', '취소')
      //     } else if (managerYn === 'Y') {
      //       this.$alertMsg('브랜드에 등록된 마스터/매니저 계정이 존재합니다.', '타이틀', '확인', '취소')
      //     } else {
      //       this.checkAllBrandDelete()
      //     }
      //   })
      //   .catch(err => {
      //     this.$alertMsg(err.desc)
      //   })
    },
    // 브랜드 정보 삭제 알럿
    checkAllBrandDelete() {
      this.$confirmMsg('브랜드 정보를 모두 삭제 하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let reqData = {
            brandId: this.brandId
          }
          deleteApprovalBrand(reqData)
            .then(res => {
              this.$router.push('/service/dashboard')
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
        .catch(err => {
          console.error(err)
        })
    },
    loadBrandDefaultImg() {
      return brandDefaultImg()
        .then(res => {
          if (res.code === '20000000') {
            if (!jglib.isEmpty(res.result)) {
              let jsonArray = JSON.parse(res.result)
              this.setBrandDefaultImg(jsonArray)
            }
          }
        })
    }
  }
}
</script>
