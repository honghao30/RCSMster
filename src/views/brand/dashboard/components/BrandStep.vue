<template>
  <div>
    <div class="step-display__board"
     :class="{ collapse : collapse }"
    >
        <div class="display__board--tit">
          <div class="tit">RBC 시작하기</div>
          <button type="button"
            class="btn-text-toggle"
            @click="btnToggleMenu"
            :class="{ collapse : collapse }"
          >
           {{ collapse ? '열기' : '닫기' }}
          </button>
        </div>
        <div class="display__board"
          :class="{ collapse : collapse }"
        >
          <div class="step-list__wrap">
            <ul class="step-ing2" v-if="stepData.type === 'chatroom'">
              <li
                v-if="stepData.chatRoom == 'Y'" :class="{ isDone: true }"
               >
                <div class="list__circle">
                  <div class="circle">
                      <span v-if="stepData.chatRoom == ''">1</span>
                  </div>
                  <div class="step-name">대화방 등록</div>
                </div>
              </li>
              <li class="isIng">
                <div class="list__circle">
                  <div class="circle">
                    <span>2</span>
                  </div>
                  <div class="step-name">템플릿 메시지 등록</div>
                </div>
              </li>
            </ul>
            <ul class="step-ing3" v-if="stepData.type === 'massage'">
              <li
                v-if="stepData.chatBot == 'Y'" :class="{ isDone: true }"
               >
                <div class="list__circle">
                  <div class="circle">
                      <span v-if="stepData.chatBot == ''">1</span>
                  </div>
                  <div class="step-name">간편챗봇 메시지 연결</div>
                </div>
              </li>
              <li class="isIng">
                <div class="list__circle">
                  <div class="circle">
                    <span>2</span>
                  </div>
                  <div class="step-name">대화방 메뉴</div>
                </div>
              </li>
              <li>
                <div class="list__circle">
                  <div class="circle">
                    <span>3</span>
                  </div>
                  <div class="step-name">브랜드 소식</div>
                </div>
              </li>
            </ul>
          </div>
          <div class="step-list__text--wrap">
            <template v-if="stepData.type === 'chatroom'">
              <div class="text-box-gray" v-if="stepData.chatRoom === ''">
                <div class="tit">Step 1. 대화방 등록하기</div>
                <p>
                  대화방을 처음 만드시나요?<br>
                  사용하실 발신번호와 통신서비스 가입 증명서를 미리 준비해주세요!
                </p>
                <ButtonCmp
                  type="btn-blue"
                >
                  대화방 등록
                </ButtonCmp>
              </div>
              <div class="text-box-gray" v-else>
                <div class="tit">Step 2. 템플릿 메시지 등록하기</div>
                <p>
                  템플릿 메시지 작성 어렵지 않아요.<br>
                  RCS에서 제공하는 템플릿으로 간단하게 템플릿 메시지를 작성할 수 있어요.
                </p>
                <ButtonCmp
                  type="btn-blue"
                >
                  템플릿 메시지 등록
                </ButtonCmp>
              </div>
            </template>
            <template v-if="stepData.type === 'massage'">
              <div class="text-box-gray" v-if="stepData.chatBot === ''">
                <div class="tit">Step 1. 간편챗봇 메시지 연결</div>
                <p>
                  챗봇으로 고객이 원하는 정보를 빠르게 제공해<br>
                  고객 만족도를 높이세요.
                </p>
                <ButtonCmp
                  type="btn-blue"
                >
                  간편챗봇 메시지 연결
                </ButtonCmp>
              </div>
              <div class="text-box-gray" v-if="stepData.chatMenu === ''">
                <div class="tit">Step 2. 대화방 메뉴</div>
                <p>
                  쉽고 간단하게 만들지만<br>
                  효과는 챗봇 만큼 유용하게 사용할 수 있어요.
                </p>
                <ButtonCmp
                  type="btn-blue"
                >
                  간편챗봇 메시지 연결
                </ButtonCmp>
              </div>
              <div class="text-box-gray" v-else>
                <div class="tit">Step 3. 브랜드 소식</div>
                <p>
                  브랜드에 새로운 소식이 생겼나요?<br>브랜드의 소식을 등록하면 빠르게 알릴 수 있어요.
                </p>
                <ButtonCmp
                  type="btn-blue"
                >
                  브랜드 소식
                </ButtonCmp>
              </div>
            </template>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  },
  props: {
    stepData: String
  },
  data () {
    return {
      collapse: false
    }
  },
  mounted() {
    this.collapse = this.collapse ? '열기' : '접기'
  },
  computed: {
    buttnText() {
      return this.collapse ? '열기' : '접기'
    }
  },
  methods: {
    btnToggleMenu () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style>

</style>
