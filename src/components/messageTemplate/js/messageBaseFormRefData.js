import openrichDescription from './messagebaseformTemplate/openrichDescription.json'
import openrichCell from './messagebaseformTemplate/openrichCell.json'
import openrichFree from './messagebaseformTemplate/openrichFree.json'
import richStandaloneText from './messagebaseformTemplate/richStandaloneText.json'
import richStandaloneTextSMS from './messagebaseformTemplate/richStandaloneTextSMS.json'
import richStandaloneMedia from './messagebaseformTemplate/richStandaloneMedia.json'
import richStandaloneHorizontal from './messagebaseformTemplate/richStandaloneHorizontal.json'
import richCarousel from './messagebaseformTemplate/richCarousel.json'

const refData = {
  title: 'messageBaseForm',
  type: 'object',
  properties: {
    formattedString: {
      RCSMessage: {}
    }
  },
  nextKey: ['cardSpec'],
  definitions: {
    openrichcardMessage: {
      type: 'object',
      properties: {
        trafficType: 'advertisement',
        openrichcardMessage: {
          card: 'open_rich_card',
          layout: {},
          suggestions: []
        }
      },
      position: 'RCSMessage',
      nextKey: ['cardType']
    },
    richcardMessage: {
      type: 'object',
      properties: {
        richcardMessage: {
          message: {},
          suggestions: {}
        }
      },
      position: 'RCSMessage',
      nextKey: ['cardType']
    },
    openrichFormType: {
      description: {
        type: 'object',
        properties: openrichDescription,
        position: 'RCSMessage.openrichcardMessage.layout'
      },
      cell: {
        type: 'object',
        properties: openrichCell,
        position: 'RCSMessage.openrichcardMessage.layout'
      },
      free: {
        type: 'object',
        properties: openrichFree,
        position: 'RCSMessage.openrichcardMessage.layout'
      }
    },
    richcardFormType: {
      standaloneText: {
        type: 'object',
        properties: richStandaloneText,
        position: 'RCSMessage.richcardMessage.message'
      },
      standaloneTextSMS: {
        type: 'object',
        properties: richStandaloneTextSMS,
        position: 'RCSMessage.richcardMessage.message'
      },
      standaloneMedia: {
        type: 'object',
        properties: richStandaloneMedia,
        position: 'RCSMessage.richcardMessage.message',
        nextKey: ['mediaHeight']
      },
      standaloneHorizontal: {
        type: 'object',
        properties: richStandaloneHorizontal,
        position: 'RCSMessage.richcardMessage.message',
        nextKey: ['mediaPos']
      },
      carousel: {
        type: 'object',
        properties: richCarousel,
        position: 'RCSMessage.richcardMessage.message',
        nextKey: ['cardWidth', 'cardCount']
      }
    },
    cardOrientation: {
      vertical: {
        type: 'object',
        properties: {
          cardOrientation: 'VERTICAL'
        },
        position: 'RCSMessage.richcardMessage.message.generalPurposeCard.layout'
      },
      horizontalLeft: {
        type: 'object',
        properties: {
          imageAlignment: 'LEFT'
        },
        position:
          'RCSMessage.richcardMessage.message.generalPurposeCard.content.media',
        addType: 'insert'
      },
      horizontalRight: {
        type: 'object',
        properties: {
          imageAlignment: 'RIGHT'
        },
        position:
          'RCSMessage.richcardMessage.message.generalPurposeCard.content.media',
        addType: 'insert'
      }
    },
    carouselOptions: {
      cardWidth: {
        medium: {
          type: 'object',
          properties: 'MEDIUM_WIDTH',
          position:
            'RCSMessage.richcardMessage.message.generalPurposeCardCarousel.layout.cardWidth'
        },
        small: {
          type: 'object',
          properties: 'SMALL_WIDTH',
          position:
            'RCSMessage.richcardMessage.message.generalPurposeCardCarousel.layout.cardWidth'
        }
      },
      carouselItem: {
        type: 'object',
        properties: {
          description: '{{description|##|count|##|}}',
          media: {
            mediaUrl: '',
            height: '|##|mediaHeight|##|'
          },
          title: '{{title|##|count|##|}}'
        },
        position:
          'RCSMessage.richcardMessage.message.generalPurposeCardCarousel.content',
        addType: 'append'
      },
      mediaHeight: {
        medium: {
          type: 'object',
          properties: {
            height: 'MEDIUM_HEIGHT'
          },
          position:
            'RCSMessage.richcardMessage.message.generalPurposeCard.content.media',
          addType: 'insert'
        },
        short: {
          type: 'object',
          properties: {
            height: 'SHORT_HEIGHT'
          },
          position:
            'RCSMessage.richcardMessage.message.generalPurposeCard.content.media',
          addType: 'insert'
        },
        tall: {
          type: 'object',
          properties: {
            height: 'TALL_HEIGHT'
          },
          position:
            'RCSMessage.richcardMessage.message.generalPurposeCard.content.media',
          addType: 'insert'
        },
        none: {
          type: 'object',
          properties: {
            height: ''
          },
          position:
            'RCSMessage.richcardMessage.message.generalPurposeCard.content.media',
          addType: 'insert'
        }
      }
    },
    suggestions: {
      urlAction: {
        type: 'object',
        properties: {
          urlAction: {
            openUrl: {
              url: ''
            }
          },
          displayText: '',
          postback: {
            data: 'set_by_chatbot_open_url'
          }
        }
      },
      dialerAction: {
        type: 'object',
        properties: {
          dialerAction: {
            dialPhoneNumber: {
              phoneNumber: ''
            }
          },
          displayText: '',
          postback: {
            data: 'set_by_chatbot_dial_phone_number'
          }
        }
      },
      calendarAction: {
        type: 'object',
        properties: {
          calendarAction: {
            createCalendarEvent: {
              useVariable: false,
              startTime: '',
              endTime: '',
              title: '',
              description: ''
            }
          },
          displayText: '',
          postback: {
            data: 'set_by_chatbot_create_calendar_event'
          }
        }
      },
      mapAction: {
        type: 'object',
        properties: {
          mapAction: {
            showLocation: {
              location: {
                latitude: 0,
                longitude: 0,
                label: ''
              },
              fallbackUrl: ''
            }
          },
          displayText: '',
          postback: {
            data: 'set_by_chatbot_show_location'
          }
        }
      },
      composeAction: {
        type: 'object',
        properties: {}
      },
      deviceAction: {
        type: 'object',
        properties: {
          deviceAction: {
            requestDeviceSpecifics: {}
          },
          displayText: '',
          postback: {
            data: 'set_by_chatbot_request_device_specifics'
          }
        }
      },
      settingsAction: {
        type: 'object',
        properties: {
          settingsAction: {
            enableDisplayedNotifications: {}
          },
          displayText: '',
          postback: {
            data: 'set_by_chatbot_enable_displayed_notifications'
          }
        }
      }
    }
  },
  relatives: {
    cardSpec: {
      openrichcard: {
        $ref: '#/definitions/openrichcardMessage'
      },
      richcard: {
        $ref: '#/definitions/richcardMessage'
      }
    },
    cardType: {
      D: {
        $ref: '#/definitions/openrichFormType/description'
      },
      C: {
        $ref: '#/definitions/openrichFormType/cell'
      },
      F: {
        $ref: '#/definitions/openrichFormType/free'
      },
      SA: {
        $ref: '#/definitions/richcardFormType/standaloneText'
      },
      SASMS: {
        $ref: '#/definitions/richcardFormType/standaloneTextSMS'
      },
      SM: {
        $ref: '#/definitions/richcardFormType/standaloneMedia'
      },
      SH: {
        $ref: '#/definitions/richcardFormType/standaloneHorizontal'
      },
      CR: {
        $ref: '#/definitions/richcardFormType/carousel'
      },
      CS: {
        $ref: '#/definitions/richcardFormType/carousel'
      }
    },
    mediaPos: {
      T: {
        $ref: '#/definitions/cardOrientation/vertical'
      },
      L: {
        $ref: '#/definitions/cardOrientation/horizontalLeft'
      },
      R: {
        $ref: '#/definitions/cardOrientation/horizontalRight'
      }
    },
    cardWidth: {
      M: {
        $ref: '#/definitions/carouselOptions/cardWidth/medium'
      },
      S: {
        $ref: '#/definitions/carouselOptions/cardWidth/small'
      }
    },
    mediaHeight: {
      T: {
        $ref: '#/definitions/carouselOptions/mediaHeight/tall'
      },
      M: {
        $ref: '#/definitions/carouselOptions/mediaHeight/medium'
      },
      S: {
        $ref: '#/definitions/carouselOptions/mediaHeight/short'
      },
      X: {
        $ref: '#/definitions/carouselOptions/mediaHeight/none'
      }
    },
    cardCount: {
      $ref: '#/definitions/carouselOptions/carouselItem'
    },
    actions: {
      set_by_chatbot_open_url: {
        $ref: '#/definitions/urlAction'
      },
      set_by_chatbot_dial_phone_number: {
        $ref: '#/definitions/dialerAction'
      },
      set_by_chatbot_create_calendar_event: {
        $ref: '#/definitions/calendarAction'
      },
      set_by_chatbot_show_location: {
        $ref: '#/definitions/mapAction'
      },
      set_by_chatbot_request_device_specifics: {
        $ref: '#/definitions/deviceAction'
      },
      set_by_chatbot_enable_displayed_notifications: {
        $ref: '#/definitions/settingsAction'
      }
    }
  }
}

export default refData
