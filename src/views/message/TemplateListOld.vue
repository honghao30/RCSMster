<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
        <div class="template__wrap">
          <div class="template__wrap--inner">
            <div class="top-ctrl-area">
                <div class="right-area">
                  <Dropdown :options="NewOptions" />
                  <Dropdown :options="NumberOptions" />
                </div>
              </div>
              <PageTitleH3 titleh3="이미지 템플릿"/>
              <div class="template__preview--wrap">

              </div>
              <!-- // 이미지 템플릿 end -->
              <PageTitleH3 titleh3="LMS 템플릿"/>
              <div class="template__preview--wrap">
                <div class="template__preview--inner">
                  <div class="template-item">
                      <div class="tit"
                      >템플릿 이름01</div>
                      <TempTypeLms
                        buttonDrections="column"
                      />
                      <div class="button-wrap">
                        <ButtonCmp
                          type="btn-blue"
                        >
                          템플릿 작성
                        </ButtonCmp>
                      </div>
                  </div>
                  <div class="template-item">
                      <div class="tit"
                      >템플릿 이름02</div>
                      <TempTypeLms
                        buttonDrections="rows"
                      />
                      <div class="button-wrap">
                        <ButtonCmp
                          type="btn-blue"
                        >
                          템플릿 작성
                        </ButtonCmp>
                      </div>
                  </div>
                  <div class="template-item">
                      <div class="tit"
                      >템플릿 이름03</div>
                      <TempTypeLms
                        buttonDrections="column"
                      />
                      <div class="button-wrap">
                        <ButtonCmp
                          type="btn-blue"
                        >
                          템플릿 작성
                        </ButtonCmp>
                      </div>
                  </div>
                  <div class="template-item">
                      <div class="tit"
                      >템플릿 이름04</div>
                      <TempTypeLms
                        buttonDrections="column"
                      />
                      <div class="button-wrap">
                        <ButtonCmp
                          type="btn-blue"
                        >
                          템플릿 작성
                        </ButtonCmp>
                      </div>
                  </div>
                </div>
              </div>
              <!-- //LMS 템플릿 end-->
              <PageTitleH3 titleh3="텍스트 템플릿"/>
              <div class="template__preview--wrap">
                  <div class="template__preview--inner">
                    <div class="template-item">
                        <div class="tit"
                        >타이틀 선택형 1</div>
                        <TempTypeText
                          TitleTypes="title-select"
                          :templeData="smsData[0]"
                        />
                        <div class="button-wrap">
                          <ButtonCmp
                            type="btn-blue"
                            @click="goCreater1"
                          >
                            템플릿 작성
                          </ButtonCmp>
                        </div>
                    </div>
                    <div class="template-item">
                        <div class="tit">
                          타이틀 선택형 2
                        </div>
                        <TempTypeText
                          TitleTypes="title-free"
                          subtitle="배송안내"
                        />
                        <div class="button-wrap">
                          <ButtonCmp
                            type="btn-blue"
                            @click="goCreater2"
                          >
                            템플릿 작성
                          </ButtonCmp>
                        </div>
                    </div>
                    <div class="template-item">
                        <div class="tit">
                          {{ smsData.templename }}
                        </div>
                        <TempTypeText
                          TitleTypes="title-point"
                          topsmTitle="텍스트 템플릿"
                        />
                        <div class="button-wrap">
                          <ButtonCmp
                            type="btn-blue"
                            @click="goCreater3"
                          >
                            템플릿 작성
                          </ButtonCmp>
                        </div>
                    </div>
                    <div class="template-item">
                        <div class="tit">
                          타이틀 자유형2
                        </div>
                        <TempTypeText
                          TitleTypes="title-point"
                          topsmTitle="텍스트 템플릿"
                        />
                        <div class="button-wrap">
                          <ButtonCmp
                            type="btn-blue"
                            @click="goCreater4"
                          >
                            템플릿 작성
                          </ButtonCmp>
                        </div>
                    </div>
                    <div class="template-item">
                        <div class="tit">
                          아이템 강조형1
                        </div>
                        <TempTypeText
                          TitleTypes="title-point"
                          topsmTitle="텍스트 템플릿"
                        />
                        <div class="button-wrap">
                          <ButtonCmp
                            type="btn-blue"
                            @click="goCreater5"
                          >
                            템플릿 작성
                          </ButtonCmp>
                        </div>
                    </div>
                    <div class="template-item">
                        <div class="tit">
                          아이템 강조형2
                        </div>
                        <TempTypeText
                          TitleTypes="title-point"
                          topsmTitle="텍스트 템플릿"
                        />
                        <div class="button-wrap">
                          <ButtonCmp
                            type="btn-blue"
                            @click="goCreater6"
                          >
                            템플릿 작성
                          </ButtonCmp>
                        </div>
                    </div>
                  </div>
              </div>
              <!-- //텍스트 템플릿 -->
          </div>
        </div>
        <!-- // 템플릿 작성 -->
      </div>
    </div>
  </div>
</template>
<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import TempTypeText from '@/views/brand/message/componentsNew/TempTypeText.vue'
import TempTypeLms from '@/views/brand/message/componentsNew/TempTypeLms.vue'
// import draggable from 'vuedraggable'TempTypeLms.vue
// import TemplateItem from '@/views/brand/template/components/TemplateItem.vue'

export default {
  name: 'Template',
  components: {
    BrandLnb,
    PageTitle,
    ButtonCmp,
    TempTypeText,
    Dropdown,
    PageTitleH3,
    TempTypeLms
    // draggable,
    // TemplateItem
  },
  data () {
    return {
      NewOptions: [
        {
          label: '최신순',
          value: 'new'
        },
        {
          label: '이름순',
          value: 'name'
        }
      ],
      NumberOptions: [
        {
          label: '10개씩',
          value: '10'
        },
        {
          label: '20개씩',
          value: '20'
        },
        {
          label: '30개씩',
          value: '30'
        }
      ],
      smsData: [
        {
          templetye: '텍스트 템플릿',
          templename: '타이틀 선택형1',
          manageTitle: '',
          custemImg: '',
          defaultImg: '',
          msgTitle: '특별한 이벤트',
          msgDesTitle: '',
          msgDesCont: '텍스트 템플릿은 SMS보다 저렴한 RCS 메시지 상품입니다.<br>90자 이내의 정보성 메시지를 패턴화하여 사전 등록 후, 이용하실 수 있습니다.'
        }
      ]
    }
  },
  methods: {
    goCreater1 () {
      this.$router.push({ name: 'Creater', query: { name: 'Creater', type: 'smsType001' } })
    },
    goCreater2 () {
      this.$router.push({ name: 'Creater', query: { name: 'Creater', type: 'smsType002' } })
    },
    goCreater3 () {
      this.$router.push({ name: 'Creater', query: { name: 'Creater', type: 'smsType003' } })
    },
    goCreater4 () {
      this.$router.push({ name: 'Creater', query: { name: 'Creater', type: 'smsType004' } })
    },
    goCreater5 () {
      this.$router.push({ name: 'Creater', query: { name: 'Creater', type: 'smsType005' } })
    },
    goCreater6 () {
      this.$router.push({ name: 'Creater', query: { name: 'Creater', type: 'smsType006' } })
    }
  }
}
</script>

<style lang="scss">

</style>
