<template>
  <div class="rcs_container service_wrap">
    <div tabindex="0" class="layer medium active">
      <div tabindex="0" class="layer_cont">
        <div class="title_wrap mar_b20">
          <span class="h4_desc bold">불러오실 브랜드를 선택해주세요. 선택 시 브랜드 정보는 자동 입력됩니다.</span>
        </div>
        <div class="layer_head">
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input"><input type="text" @keypress.enter="search(1)" v-model="formData.inputValue" placeholder="브랜드명을 검색하세요."></span>
              <a href="javascript:void(0);" @click="search(1)" class="btn sml gray"><span>검색</span></a>
            </div>
          </div>
        </div>
        <div class="layer_body" v-if="brand.list.length > 0">
          <div class="layer_scroll">
            <div class="search_result">
              <table class="tbl_col_type">
                <colgroup>
                  <col style="width:45px">
                  <col style="width:auto">
                  <col style="width:180px;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">브랜드 명</th>
                    <th scope="col">승인일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in this.brand.list" :key="index">
                    <td>
                      <span class="custom_radio single">
                        <input type="radio" name="radio" :id="item.brandId" v-model="selBrandId" :value="item.brandId">
                        <label :for="item.brandId"></label>
                      </span>
                    </td>
                    <td>
                      <div class="img_brand left">
                        <label :for="item.brandId">
                          <span class="img_area_in"><img :src="item.profileImgFileUrl"></span>
                          <span>{{item.name}}</span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <label :for="item.brandId">{{item.aprvDt}}</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div class="box_result_info center" v-if="brand.list.length == 0">
            <p>검색 결과가 없습니다.</p>
          </div>
          <div class="box_result_info center" v-if="brand.list.length > 0 && selBrandId == null">
            <p class="no_select">브랜드를 선택하세요.</p>
          </div>
          <pagination v-if="brand.total > 0" :total="brand.total" @change="search" :current-page.sync="formData.page" :pageSize="formData.size"/>
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="closePopup"><span>취소</span></a>
            <a href="javascript:void(0);" class="btn sml black" @click="confirm"><span>확인</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { brandOperation } from '@/api/service/service'
import { getImageUrl } from '@/api/common/code'
import { getMasterBrand } from '@/api/service/approvalBrand'

export default {
  name: 'brandInfoSelector',
  components: {
    Pagination
  },
  data() {
    return {
      formData: {
        page: 1,
        size: 5,
        inputType: 'BRAND',
        inputValue: ''
      },
      brand: {
        total: 0,
        list: []
      },
      selBrandId: null
    }
  },
  created() {
    this.search(1)
  },
  methods: {
    search(page) {
      this.selBrandId = null
      this.formData.page = page
      brandOperation(this.formData)
        .then(res => {
          this.brand.total = res.result.totalSize
          this.brand.list = res.result.operList
          // 리스트 프로필 이미지 셋팅
          this.brand.list.forEach((item, index) => {
            let fileParam = {
              fileId: item.profileImgFileId,
              fileNo: item.profileImgFileNo
            }
            getImageUrl(fileParam).then(res => {
              item.profileImgFileUrl = res.downloadUrl
            })
          })
        })
      // brandOperation End
    },
    confirm() {
      if (this.selBrandId) {
        this.$confirmMsg('입력한 데이터가 초기화 됩니다.<br>선택하신 브랜드 정보로 변경하시겠습니까?', '타이틀', '확인', '취소')
          .then(() => {
            let brandInfo = {}
            const params = { brandId: this.selBrandId }
            getMasterBrand(params)
              .then(res => {
                const result = res.result
                brandInfo.descr = result.descr
                if (result.bgImgFileId && result.bgImgFileNo && result.bgImgFileName) {
                  brandInfo.bgImgFileId = result.bgImgFileId
                  brandInfo.bgImgFileNo = result.bgImgFileNo
                  brandInfo.bgImgFileName = result.bgImgFileName
                  brandInfo.bgImgFileUrl = result.bgImgFileUrl
                }
                if (result.profileImgFileId && result.profileImgFileNo && result.profileImgFileName) {
                  brandInfo.profileImgFileId = result.profileImgFileId
                  brandInfo.profileImgFileNo = result.profileImgFileNo
                  brandInfo.profileImgFileName = result.profileImgFileName
                  brandInfo.profileImgFileUrl = result.profileImgFileUrl
                }
                brandInfo.menuItemList = result.menuItemList
                brandInfo.bizCateGrp = result.bizCateGrp
                brandInfo.bizCateCd = result.bizCateCd
                if (result.cate3) {
                  brandInfo.cate3 = result.cate3
                }
                brandInfo.url = result.url
                if (result.addrRegnNo) {
                  brandInfo.addrRegnNo = result.addrRegnNo
                  brandInfo.addrMngNo = result.addrMngNo
                  brandInfo.addrDtl = result.addrDtl
                }
                if (result.email) {
                  brandInfo.email = result.email
                }
                brandInfo.subTitle = result.subTitle
                brandInfo.rcsReply = result.rcsReply
              })
              .finally(() => {
                this.$emit('setLoadBrandInfo', brandInfo)
                this.closePopup()
              })
          })
          .catch(() => {
          })
      }
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
