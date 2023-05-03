let openrichcardDefaultData = {
  layout: {
    RCSMessage: {
      openrichcardMessage: {
        card: 'open_rich_card',
        layout: {},
        suggestions: []
      }
    }
  },
  imageView: {
    widget: 'ImageView',
    width: 'match',
    height: '90dp',
    gravity: 'center|vertical',
    scaleType: 'centerCrop',
    mediaUrl: ''
  },
  textView: {
    widget: 'TextView',
    width: 'content',
    height: 'content',
    textAlignment: 'textStart',
    textColor: '#252525',
    textSize: '14dp',
    textStyle: '',
    text: ''
  },
  linearLayout: {
    widget: 'LinearLayout',
    width: 'match',
    height: 'content',
    paddingBottom: '8dp',
    orientation: 'vertical',
    visibility: 'visible',
    children: []
  },
  view: {
    widgetPolicy: {
      allowedAttributes: ['visibility']
    },
    widget: 'View',
    width: 'match',
    height: '0.5dp',
    background: '#B3252525',
    marginBottom: '16dp',
    marginTop: '8dp',
    visibility: 'gone'
  },
  suggestions: {
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
    local_url: {
      localBrowserAction: {
        openUrl: {
          url: '',
          isHalfView: false,
          postParameter: ''
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
  },
  cell: {
    row: {
      widget: 'LinearLayout',
      width: 'match',
      height: 'content',
      paddingBottom: '8dp',
      orientation: 'horizontal',
      visibility: 'visible',
      children: [
        {
          widgetPolicy: {
            allowedAttributes: [
              'text',
              'textAlignment',
              'textColor',
              'textSize',
              'textStyle'
            ]
          },
          widget: 'TextView',
          width: 'content',
          height: 'content',
          textAlignment: 'textStart',
          textColor: '#252525',
          textSize: '14dp',
          textStyle: '',
          text: ''
        },
        {
          widgetPolicy: {
            allowedAttributes: [
              'text',
              'textAlignment',
              'textColor',
              'textSize',
              'textStyle',
              'visibility'
            ]
          },
          widget: 'TextView',
          width: 'match',
          height: 'content',
          textAlignment: 'textEnd',
          textColor: '#252525',
          textSize: '14dp',
          textStyle: '',
          text: '',
          visibility: ''
        }
      ]
    }
  }
}

export default openrichcardDefaultData
