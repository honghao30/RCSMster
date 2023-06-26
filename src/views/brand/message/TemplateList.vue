<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 작성" />
        <div class="template-list__wrap">
          <PageTitleH3 titleh3="이미지 템플릿"/>
          <div class="template-list">
            <TemplateItem
              itemTitle="상품권/티켓형"
              :templateData=ImageTemplate[0] />
            <TemplateItem
              itemTitle="이미지 강조형3"
              :templateData=ImageTemplate[1] />
            <TemplateItem
              itemTitle="이미지 강조형1"
              :templateData=ImageTemplate[2] />
            <TemplateItem
              itemTitle="이미지 강조형2"
              :templateData=ImageTemplate[3] />
            <TemplateItem
              itemTitle="썸네일 세로형"
              :templateData=ImageTemplate[4] />
            <TemplateItem
              itemTitle="썸네일 가로형"
              :templateData=ImageTemplate[5] />
            <TemplateItem
              itemTitle="SNS형"
              :templateData=ImageTemplate[6] />
          </div>
          <PageTitleH3 titleh3="LMS 템플릿"/>
          <div class="template-list">
            <TemplateItem
              itemTitle="장문형"
              :templateData=LMSTemplate[0] />
            <TemplateItem
              itemTitle="문단형"
              :templateData=LMSTemplate[1] />
            <TemplateItem
              itemTitle="타이틀 강조형"
              :templateData=LMSTemplate[2] />
            <TemplateItem
              itemTitle="청구서형"
              :templateData=LMSTemplate[3] />
            <TemplateItem
              itemTitle="광고형"
              :templateData=LMSTemplate[4] />
            <TemplateItem
              itemTitle="예약/일정 안내형"
              :templateData=LMSTemplate[5] />
          </div>
          <PageTitleH3 titleh3="텍스트 템플릿"/>
          <div class="template-list">
            <TemplateItem
              itemTitle="아이템 강조형1"
              :templateData=textTemplate[0] />
            <TemplateItem
              itemTitle="아이템 강조형2"
              :templateData=textTemplate[1] />
            <TemplateItem
              itemTitle="타이틀 자유형1"
              :templateData=textTemplate[2] />
            <TemplateItem
              itemTitle="타이틀 자유형2"
              :templateData=textTemplate[3] />
            <TemplateItem
              itemTitle="타이틀 선택형1"
              :templateData=textTemplate[4] />
            <TemplateItem
              itemTitle="타이틀 선택형2"
              :templateData=textTemplate[5] />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import TemplateItem from '@/views/brand/message/components/TemplateItem.vue'
import { ImageTemplate, LMSTemplate, textTemplate } from '@/views/brand/message/templateData.js'
export default {
  components: {
    BrandLnb,
    PageTitle,
    PageTitleH3,
    TemplateItem
  },
  data() {
    return {
      ImageTemplate,
      LMSTemplate,
      textTemplate
    }
  }
}

</script>

<style>

</style>
