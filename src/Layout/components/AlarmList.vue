<template>
    <div class="alarm-wrap__layer"
    >
    <!--  @click="$emit('closeAlarmLayer')"-->
        <div class="alarm-wrap__layer--container">
          <div class="alarm-wrap__header">
              <h2>알림</h2>
              <ButtonCmp
                type="btn-close-icon"
                @click="$emit('closeAlarmLayer')"
              ><span class="irtext">닫기</span></ButtonCmp>
          </div>
          <!-- // 알림 헤더 -->
          <div class="alarm-wrap__body">
              <div class="alarm-msg__notice">
                최근 14일 이내 알림만 노출됩니다.
              </div>
              <div class="alarm-msg__wrap">
                  <ul>
                    <li
                      v-for="(list, index) in alarmList"
                      :key="index"
                    >
                      <div class="alarm-info">
                        <span class="flag-progress"
                        :class="{
                          'reject': list.status === '안심마크 선정' || list.status === '삭제' || list.status === '반려'  || list.status === '삭제 D-1',
                          'ing': list.status === '처리중' || list.status === '안심마크 선정',
                          'done': list.status === '승인'
                        }"
                        >{{ list.status }}</span>
                        <span class="data">{{ list.date }}</span>
                      </div>
                      <div class="alarm-text">
                        <p><strong>{{ list.name }}</strong> {{ list.comment1 }}</p>
                        <p>{{ list.comment2 }}</p>
                        <p>{{ list.comment3 }}</p>
                        <ButtonCmp
                          type="btn-remove-alarm"
                          v-if="list.status === '삭제'"
                          @click="removeLists(index)"
                        >
                           <span class="irtext">삭제</span>
                        </ButtonCmp>
                      </div>
                    </li>
                  </ul>
              </div>
              <div class="button__wrap">
                <a href="#" class="btn btn-blue">알림 전체보기</a>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  name: 'HeaderAlarm',
  components: { ButtonCmp },
  data() {
    return {
      alarmList: [
        {
          status: '삭제',
          name: '롯데홈쇼핑',
          date: '2023. 04. 06 17:12:22',
          comment1: '대화방이 삭제될 예정입니다.',
          comment2: '사유 : 비전시 30일',
          comment3: '대화방 설정을 전시로 변경해 주세요.  대화방 목록'
        },
        {
          status: '승인',
          name: '롯데홈쇼핑',
          date: '2023. 04. 06 17:12:22',
          comment1: '대화방이 삭제될 예정입니다.',
          comment2: '사유 : 비전시 30일',
          comment3: '대화방 설정을 전시로 변경해 주세요.  대화방 목록'
        },
        {
          status: '반려',
          name: '롯데홈쇼핑',
          date: '2023. 04. 06 17:12:22',
          comment1: '대화방이 삭제될 예정입니다.',
          comment2: '사유 : 비전시 30일',
          comment3: '대화방 설정을 전시로 변경해 주세요.  대화방 목록'
        },
        {
          status: '삭제 D-1',
          name: '롯데홈쇼핑',
          date: '2023. 04. 06 17:12:22',
          comment1: '대화방이 삭제될 예정입니다.',
          comment2: '사유 : 비전시 30일',
          comment3: '대화방 설정을 전시로 변경해 주세요.  대화방 목록'
        },
        {
          status: '안심마크 선정',
          name: '롯데홈쇼핑',
          date: '2023. 04. 06 17:12:22',
          comment1: '대화방이 삭제될 예정입니다.',
          comment2: '사유 : 비전시 30일',
          comment3: '대화방 설정을 전시로 변경해 주세요.  대화방 목록'
        }
      ]
    }
  },
  mounted() {
    document.body.classList.add('modal-open')
  },
  beforeDestroy() {
    document.body.classList.remove('modal-open')
  },
  methods: {
    removeLists (index) {
      this.alarmList.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
