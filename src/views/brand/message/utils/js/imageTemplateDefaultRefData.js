/** 이미지 템플릿 용 default 데이터 구조 */
let imageTemplateDefaultData = {
  /** 사용자 입력 데이터 */
  mainImg: [
    {
      param: 'media',
      value: ''
    },
    {
      param: 'mediaUrl',
      value: ''
    }
  ],
  titAndDesc: [
    {
      param: 'title',
      value: '',
      decoration: {
        textSize: '16dp',
        textAlignment: 'textStart',
        textStyle: 'bold',
        textColor: '#232323'
      }
    },
    {
      param: 'description',
      value: '',
      decoration: {}
    }
  ],
  detail: [
    {
      param: 'subMedia',
      value: ''
    },
    {
      param: 'subTitle',
      value: '',
      decoration: {}
    },
    {
      param: 'subDesc',
      value: '',
      decoration: {}
    },
    {
      param: 'subMediaUrl',
      value: ''
    }
  ],
  /** 버튼 */
  buttons: {
    default: {
      action: {
        displayText: '',
        postback: {
          data: ''
        }
      }
    },
    open_url: {
      urlAction: {
        openUrl: {
          url: ''
        }
      }
    },
    dial_phone_number: {
      dialerAction: {
        dialPhoneNumber: {
          phoneNumber: ''
        }
      }
    },
    show_location: {
      mapAction: {
        showLocation: {
          location: {
            latitude: '',
            longitude: '',
            label: ''
          },
          fallbackUrl: ''
        }
      }
    },
    search_locations: {
      mapAction: {
        showLocation: {
          location: {
            query: ''
          },
          fallbackUrl: ''
        }
      }
    },
    request_location_push: {
      mapAction: {
        requestLocationPush: {}
      }
    },
    create_calendar_event: {
      calendarAction: {
        createCalendarEvent: {
          startTime: '',
          endTime: '',
          title: '',
          description: ''
        }
      }
    },
    compose_text_message: {
      composeAction: {
        composeTextMessage: {
          phoneNumber: '',
          text: ''
        }
      }
    },
    copy_to_clipboard: {
      clipboardAction: {
        copyToClipboard: {
          text: ''
        }
      }
    }
  }
}

export default imageTemplateDefaultData
