<template>
  <!-- 운영 히스토리 : 마스터/매니저/대행사 운영 권한 별 노출 항목 다름(노출 Case 정의 참고) -->
  <div class="dashboard__wrap">
    <div class="dashboard__wrap--inner">
      <div class="dashBoard-main__content manage_history">
        <!-- 운영권한 관리 영역 -->
        <div class="board-main__box--roun-type">
          <PageTitleH3 titleh3="운영권한 관리" />
          <div class="top-ctrl-area">
            <div class="left-area">
              <Dropdown searchable :options="dropdownManageBrandHistory" placeholder="브랜드명" class="large-dropdown">
              </Dropdown>
              <div class="totalnum-box"><span class="totalnum">0</span>건</div>
            </div>
            <div class="right-area">
              <Dropdown :options="dropdownManageBrandType" placeholder="유형">
              </Dropdown>
              <Dropdown :options="dropdownManageBrandStatus" placeholder="상태">
              </Dropdown>
            </div>
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <thead>
                <tr>
                  <th scope="col" width="173px"><span>업데이트일</span></th>
                  <th scope="col" width="253px"><span>브랜드</span></th>
                  <th scope="col" width="133px"><span>유형</span></th>
                  <th scope="col" width="319px"><span>내용</span></th>
                  <th scope="col" width="233px"><span>상태</span></th>
                  <th scope="col" width="173px"><span>담당자</span></th>
                  <th scope="col" width="92px"><span>수정방식</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in ManageHistoryData" :key="i">
                  <td>
                    <span class="data-update">{{ item.update }}</span>
                  </td>
                  <td class="l-align">
                    <div class="data-side">
                      <span class="data-brand-ing" v-if="item.brandIng">운영중</span>
                      <span class="data-brand">{{ item.brand }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="data-type">{{ item.type }}</span>
                  </td>
                  <td class="l-align">
                    <div class="data-flex">
                      <span class="data-content" v-for="(contItem,i) in item.contentData" :key="i">{{ contItem.content }}</span>
                    </div>
                  </td>
                  <td class="l-align">
                    <div class="data-flex">
                      <span>{{ item.status }}</span>
                      <span class="data-status-reason">{{ item.statusReason }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="data-flex">
                      <span class="data-manager">{{ item.manager }}</span>
                      <span class="data-angency">{{ item.managerAgency }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="data-modify">{{ item.modify }}</span>
                  </td>
                </tr>
                <!-- 검색결과 없을 때 -->
                <tr>
                  <td colspan="7">
                    <div class="result-none">
                      <p>검색결과가 없습니다.</p>
                    </div>
                  </td>
                </tr>
                <!-- // 검색결과 없을 때 -->
              </tbody>
            </table>
          </div>
          <PagingCmp />
        </div>
        <!-- // 운영권한 관리 영역 -->
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'

export default {
  components: {
    Dropdown,
    PagingCmp,
    PageTitleH3
  },
  data() {
    return {
      dropdownManageBrandHistory: [
        {
          label: '브랜드 명 1',
          value: '01'
        },
        {
          label: '브랜드 명 2',
          value: '02'
        },
        {
          label: '브랜드 명 3',
          value: '03'
        },
        {
          label: '브랜드 명 4',
          value: '04'
        }
      ],
      dropdownManageBrandType: [
        {
          label: '내 계정',
          value: 'myinfo'
        },
        {
          label: '기업정보',
          value: 'companyinfo'
        },
        {
          label: '브랜드',
          value: 'brand'
        },
        {
          label: '운영자',
          value: 'manager'
        }
      ],
      dropdownManageBrandStatus: [
        {
          label: '가입',
          value: 'join'
        },
        {
          label: '수정',
          value: 'modify'
        },
        {
          label: '탈퇴',
          value: 'out'
        },
        {
          label: '승인완료',
          value: 'done'
        },
        {
          label: '반려',
          value: 'reject'
        },
        {
          label: '사용중지',
          value: 'stop'
        }
      ],
      ManageHistoryData: [
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'SYSTEM STUDIOS',
          type: '브랜드',
          contentData: [
            {
              content: 'LANVIN COLLECTION'
            }
          ],
          status: '반려',
          statusReason: '통신서비스 가입증명원 등록 번호와 불일치함',
          manager: '오동동',
          managerAgency: 'SYSTEM STUDIO',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: true,
          brand: 'LANVIN COLLECTION',
          type: '브랜드',
          contentData: [
            {
              content: 'lalachoi@studios.com'
            }
          ],
          status: '최초등록',
          manager: '김미미',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'SYSTEM STUDIOS',
          type: '브랜드',
          contentData: [
            {
              content: 'lalachoi@studios.com'
            }
          ],
          status: '반려',
          statusReason: '인터넷 광고 금지 메시지​',
          manager: '오동동',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'LANVIN COLLECTION',
          type: '운영자',
          contentData: [
            {
              content: 'lalachoi@studios.com'
            },
            {
              content: 'pkm132@studios.com'
            }
          ],
          contentAdd: 'pkm132@studios.com',
          status: '수정요청',
          statusReason: '시스템 스튜디오 템플릿',
          manager: '김미미',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: true,
          brand: 'SYSTEM STUDIOS',
          type: '운영자',
          contentData: [
            {
              content: 'lalachoi@studios.com'
            }
          ],
          status: '초대',
          manager: '최라라',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'SYSTEM STUDIOS',
          type: '내 계정',
          contentData: [
            {
              content: 'CX hub'
            }
          ],
          status: '탈퇴',
          manager: '김미미',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'LANVIN COLLECTION',
          type: '브랜드',
          contentData: [
            {
              content: 'LANVIN COLLECTION'
            }
          ],
          status: ' 수정',
          statusReason: '휴대폰',
          manager: '김미미',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'SYSTEM STUDIOS',
          type: '브랜드',
          contentData: [
            {
              content: 'CX hub'
            }
          ],
          status: '최초등록',
          manager: '홍길동',
          modify: 'Web'
        },
        {
          update: '2023.04.25 13:00',
          brandIng: false,
          brand: 'LANVIN COLLECTION',
          type: '브랜드',
          contentData: [
            {
              content: '한섬 패션'
            }
          ],
          status: '승인완료',
          manager: '김미미',
          modify: 'Web'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
