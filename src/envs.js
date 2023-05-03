export default {
  // 해당 프레임워크가 사용될 시스템 이름
  // 특정 타입 템플릿에서 상단에 출력됨
  name: 'RCS Biz Center',
  // 개발하고 있는 서비스의 고유 ID 값
  // request 해더 및 Log 생성 시, 사용 된다.
  systemId: 'RCSBP',
  // request 해더에 사용되는 API 버전 기본 정보
  // api 조회 간 meta 값에 apiVersion 정보가 있을 경우, meta값을 우선으로 한다.
  apiVersion: '1.0',
  // local 개발환경에서 작업 시, restful mockup 서버 url 정보
  // 차후, 개발 서버가 구축되면 그곳으로 변경
  devUrl: '/BP',
  // 서버 (개발, 운영) 환경에 build하여 업로드 할 경우, 기본 api base url
  buildUrl: '/BP',
  framework: {
    // local 개발환경에서 작업 시, restful mockup 서버를 사용 여부
    // Server api가 없을 경우, json-server가 default
    // framework에서 제공되는 기본 셋에서만 적용 됨
    useRestfulMockup: true,
    // 빌드된 이후에도 mockup을 사용할 경우 true로 셋팅
    // useRestfulMockup 보다 더 상위. useRestfulMockup값이 true여도 이 값이 true 면 무시된다.
    onlyMockup: false,
    // 기본 locale값을 지정한다. default는 Browser 기본이다.
    // 사용자가 직접 변경한 이후 부터는 local에 셋팅값이 저장되어 그 셋팅 값으로만 사용된다. (차후, localStorage로 저장되어 개인화 됨)
    locale: 'ko'
  }
}
