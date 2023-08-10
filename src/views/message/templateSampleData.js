const ImageTemplate = [
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '상품권/티켓형'
      }
    },
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template01.png')
      }
    },
    {
      type: 'Item',
      info: {
        mainText: '얼리버드 티켓 50%',
        subText: '프랑스 국립현대무술관 전 : 라울 뒤피'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '더현대서울 X 퐁피두센터',
        description: '행복을 전하는 도슨트와 함께하는 “라울 뒤피의 위대한 예술 세계” 베테랑 도스트의 고품격 전시해설을 함께합니다. 행복의 화가 라울 뒤피의 위대한 예술 세계를 더욱 깊고 풍성하게 즐겨보세요.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['얼리버드 1인권', '얼리버드 2인권']
      }
    },
    {
      type: 'Table',
      info: {
        title: '전시 안내',
        description: [
          {
            tableTitle: '전시명',
            tableText: '프랑스국립현대미술관 전<br>: 라울 뒤피'
          },
          {
            tableTitle: '전시기간',
            tableText: '2023.5.17~ 2023.10.23'
          },
          {
            tableTitle: '전시장소',
            tableText: '더현대서울 6층 ALT.1'
          },
          {
            tableTitle: '관람시간',
            tableText: '평일(월-금) 10:30 - 20:00<br>주말(금-일) 10:30 - 20:30'
          },
          {
            tableTitle: '전시문의',
            tableText: '02 - 325 - 1077<br>gcn@gncmedia.com'
          }
        ]
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.']
      }
    }
  ],
  [
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template02.png')
      }
    },
    {
      type: 'MainTitle',
      info: {
        mainTitle: '6월 신작 소개'
      }
    },
    {
      type: 'Item',
      info: {
        mainText: '프로방스 여행',
        subText: '내 삶이 가장 빛나는 순간으로'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '예술가들이 매혹된 프로방스<br> 빛과 색을 따라 떠나는 아름다운 여행',
        description: '프랑스 남부 프로방스 지역은 지중해와 맞닿아 있어 연중 온화하고 화창하다. 도시와 마을의 경계가 모호하고 자연과 건축물이 조화를 이루며 만들어 내는 아름다운 전망에 여행자들은 매혹된다. 고르드는 ‘2023 세계에서 가장 아름다운 마을’로 선정되었고, 고흐의 대표작 〈별이 총총한 밤〉과 〈노란 방〉은 아를에서 탄생되었다. 카뮈는 노벨문학상을 탄 후 언덕 위 작은 마을 루르마랭에서 신분을 숨기고 조용한 삶을 살았다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['신작 보러가기']
      }
    }
  ],
  [
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template03.png')
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '국내여행지 추천 베스트 10<br>지금 떠나보세요.',
        description: '제주를 여행한다면 수많은 관광명소 중 어디를 가야할지 행복한 고민을 하게되죠.<br> 천혜의 아름다운 자연 경관을 만나보세요.<br>분명 멋진 시간이 될거예요!'
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['자세히 보러가기']
      }
    }
  ],
  [
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template04.png')
      }
    },
    {
      type: 'SubDescription',
      info: {
        type: 'title',
        subTitle: '2주간 즐기는 프리미엄 특별혜택!',
        description: [
          {
            title: '행사기간',
            desc: '2022.07.01 ~ 2022.07.31'
          },
          {
            title: '참여대상',
            desc: '프리미엄 등급 고객'
          },
          {
            title: '제공혜택',
            desc: '22% 추가적립 + 무료배송'
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['자세히 보러가기']
      }
    }
  ],
  [
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template05.png')
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '미리 만나는 핫썸머 SALE!!',
        description: '내일 오전 10시 먼저 만나볼 수 있는 특템 기회에 고객님을 초대합니다.<br> 최대 50% 할인을 받아보세요! '
      }
    },
    {
      type: 'SubDescription',
      info: {
        type: 'thum',
        subTitle: '앱에서 먼저 할인 혜택을 누리세요.',
        description: [
          {
            thumSrc: require('@/assets/images/message/thum_01.png'),
            desc: '여성<br>이번 시즌 꼭 사야할 아이템'
          },
          {
            thumSrc: require('@/assets/images/message/thum_02.png'),
            desc: '남성<br>여름의 낭만을 담아 스타일 도둑'
          },
          {
            thumSrc: require('@/assets/images/message/thum_03.png'),
            desc: '아동<br>뛰어 놀기 딱 좋은 편안하고 시원한 룩 '
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['쇼핑 시작하기']
      }
    }
  ],
  [
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template06.png')
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '건강함과 자신감 그리고, 몸의 유연성을<br>필라테스로 동시에 잡으세요.',
        description: '필라테스는 슬픔과 우울함의 반대되는 활기찬 웰빙 라이프와도 관련이 있습니다. 이는 똑바로 앉는 자세는 스트레스에 대항하여 회복력을 강화하고, 자신감을 부여하는 등 간편한 행동 양식의 변화일 수 있습니다.<br><br>신체의 자세는 자신감 정도와 자기 평가 능력에 영향을 미칩니다. 연구 과정 중 자신을 평가하는 기회가 주어졌을 때 직립 자세를 취했던 사람들이 자신들의 선택에 더 자신이 있었습니다.'
      }
    },
    {
      type: 'Thumnails',
      info: {
        thums: [
          {
            thumSrc: require('@/assets/images/message/thum_04.png')
          },
          {
            thumSrc: require('@/assets/images/message/thum_05.png')
          },
          {
            thumSrc: require('@/assets/images/message/thum_06.png')
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['자세히 보러가기']
      }
    }
  ],
  [
    {
      type: 'Description',
      info: {
        subTitle: '친구야, 이거 요리해 봤어?<br>요리가 빛나는 순간, 마이 테이블 레시피',
        description: '『요리가 빛나는 순간, 마이 테이블 레시피』는 저자가 좋아하는 식재료를 7개 선정하여 그 재료로 만든 다양한 레시피를 소개한다. 아보카도, 고기, 달걀, 치킨, 해산물, 토마토, 초콜릿으로 나누어 각각의 식재료로 만드는 흔한 듯 흔하지 않은 저자만의 요리를 소개하는데, 특히 사진에서 푸드스타일리스트인 저자의 뛰어난 감각과 함께 저자가 사랑하는 특별한 요리 도구와 식재료도 그 특징과 구입처까지 엿볼 수 있다.'
      }
    },
    {
      type: 'MainImage',
      info: {
        imgUrl: require('@/assets/images/message/image_template07.png')
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['자세히 보러가기']
      }
    }
  ]
]

const LMSTemplate = [
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '장문형 LMS 템플릿'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: 'RCS메시지는 어떻게 보내죠?',
        description: '성공적인 비즈니스를 위하여 브랜드 소식 등<br> RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.<br><br>성공적인 비즈니스를 위하여 브랜드 소식 등 RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.성공적인 비즈니스를 위하여 브랜드 소식 등<br> RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.<br><br>성공적인 비즈니스를 위하여 브랜드 소식 등<br>RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'column',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.']
      }
    }
  ],
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '문단형 LMS 템플릿'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: 'RCS메시지는 어떻게 보내죠?',
        description: '성공적인 비즈니스를 위하여 브랜드 소식 등<br>RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: 'RCS메시지는 어떻게 보내죠?',
        description: '성공적인 비즈니스를 위하여 브랜드 소식 등<br>RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: 'RCS메시지는 어떻게 보내죠?',
        description: '성공적인 비즈니스를 위하여 브랜드 소식 등<br>RCS Biz Center에서 다양한 메시지를 만들어 고객과 소통하는 브랜드입니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.']
      }
    }
  ],
  [
    {
      type: 'Item',
      info: {
        mainText: '타이틀 강조형',
        subText: '안드로이드 단말에 관하여'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: 'RCS메시지는 어떻게 보내죠?',
        description: '브랜드의 성공적인 비즈니스를 위하여 RCS Biz Centert에서 다양한 메시지를 만들어보세요. <br><br>브랜드의 성공적인 비즈니스를 위하여 RCS Biz Centert에서 다양한 메시지를 만들어보세요.<br> 브랜드의 성공적인 비즈니스를 위하여 RCS Biz Centert에서 다양한 메시지를 만들어보세요.'
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['버튼1']
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.']
      }
    }
  ],
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '청구서함 LMS 템플릿',
        borderNone: true
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '브랜드님, 안녕하세요.',
        description: 'RCS 메시지를 이용해주셔서 감사합니다.<br>LMS 템플릿으로 청구서와 영수증을 만들어서 사용해보세요.'
      }
    },
    {
      type: 'table',
      info: {
        title: '납부 정보',
        description: [
          {
            tableTitle: '자동납부',
            tableText: '하나카드'
          },
          {
            tableTitle: '승인예정일',
            tableText: '2월 13일'
          },
          {
            tableTitle: '약정기간',
            tableText: '-'
          },
          {
            tableTitle: '예상해지금액',
            tableText: '-'
          },
          {
            tableTitle: '남은 기기 할부금',
            tableText: '820,3000원'
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* 매월 0일 기준입니다.', '* 이월 시, 7% 가산금액이 2개월 후 청구됩니다.']
      }
    }
  ],
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '광고형 LMS 템플릿'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '상품을 효과적으로 보내고 싶다면?',
        description: '고객에게 프로모션 상품 하나를 집중적으로 제시하고 싶을때, 광고형 템플릿을 사용해보세요.<br>효과적입니다.'
      }
    },
    {
      type: 'Item',
      info: {
        mainText: '최대 1,300자',
        subText: 'LMS 템플릿이 새롭게 오픈합니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '상품을 효과적으로 보내고 싶다면?',
        description: '고객에게 프로모션 상품 하나를 집중적으로 제시하고 싶을때, 광고형 템플릿을 사용해보세요.<br>효과적입니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.']
      }
    }
  ],
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '예정/일정 안내형'
      }
    },
    {
      type: 'Description',
      info: {
        subTitle: '상품을 효과적으로 보내고 싶다면?',
        description: '고객에게 프로모션 상품 하나를 집중적으로 제시하고 싶을때, 광고형 템플릿을 사용해보세요.<br>효과적입니다.'
      }
    },
    {
      type: 'SubDescription',
      info: {
        type: 'history',
        subTitle: '예약 일정 내역',
        description: [
          {
            title: '행사소개',
            desc: '부산 세계 EXPO'
          },
          {
            title: '예약일시',
            desc: '2023.10.01 ~ 2023.12.31'
          },
          {
            title: '좌석정보',
            desc: 'A열 11 ~ 14'
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'SubDescription',
      info: {
        type: 'history',
        subTitle: '결제 내역',
        description: [
          {
            title: '결제수단',
            desc: '카드 (1111)'
          },
          {
            title: '결제금액',
            desc: '100,000원'
          },
          {
            title: '결제정보',
            desc: '일시불'
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        direction: 'row',
        buttons: ['버튼1', '버튼2']
      }
    },
    {
      type: 'Notice',
      info: {
        noticeText: ['* RCS는 4천만 RCS 사용자를 대상으로 안드로이드 단말에서만 수신됩니다.']
      }
    }
  ]
]

const textTemplate = [
  [
    {
      type: 'Item',
      info: {
        reverse: true,
        mainText: '아이템 강조형',
        subText: '텍스트 템플릿'
      }
    },
    {
      type: 'Description',
      info: {
        description: '강조하고 싶은 문구에<br>집중해주세요.<br><br>정보성 메시지의 인식률을 높여줍니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['버튼']
      }
    }
  ],
  [
    {
      type: 'Item',
      info: {
        reverse: true,
        mainText: '아이템 강조형',
        subText: '텍스트 템플릿'
      }
    },
    {
      type: 'MainTitle',
      info: {
        mainTitle: '가능 글자수',
        pointText: '90자'
      }
    },
    {
      type: 'Table',
      info: {
        description: [
          {
            tableTitle: '심사승인여부',
            tableText: '필수'
          },
          {
            tableTitle: '단가',
            tableText: '대행사 문의'
          },
          {
            tableTitle: '특징',
            tableText: '로고 사전 등록 가능'
          }
        ]
      }
    }
  ],
  [
    {
      type: 'Table',
      info: {
        title: 'RBC 택배',
        pointText: '배송완료',
        description: [
          {
            tableTitle: '보내는 사람',
            tableText: 'RCS Biz Center 판매점',
            bold: true
          },
          {
            tableTitle: '배송지',
            tableText: '서울 중구 을지로 000빌딩',
            bold: true
          },
          {
            tableTitle: '상품',
            tableText: '상품패키지6종',
            bold: true
          }
        ]
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['버튼']
      }
    }
  ],
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '인증번호',
        pointText: '1234566'
      }
    },
    {
      type: 'Description',
      info: {
        description: 'RCS Biz Center의<br>로그인 인증을 위한 인증번호 입니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['버튼']
      }
    }
  ],
  [
    {
      type: 'MainTitle',
      info: {
        mainTitle: '안내'
      }
    },
    {
      type: 'Description',
      info: {
        description: '텍스트 템플릿은<br>SMS보다 저렴한 RCS 메시지 상품입니다.<br><br>90자 이내으 정보성 메시지를<br> 패턴화하여 사전등록 후, 이용하실 수 있습니다.'
      }
    },
    {
      type: 'Buttons',
      info: {
        buttons: ['템플릿 등록하기']
      }
    }
  ]

]

export { ImageTemplate, LMSTemplate, textTemplate }
