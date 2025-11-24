# 영화 정보를 조회하고 개봉일에 대한 알림을 받을 수 있는 앱

## 기능

1. 영화 리스트
2. 영화 상세정보
3. 개봉일 캘린더에 추가 기능
4. 개봉일 푸시 알림 기능

- 외부 API 이용하여 데이터 호출
- 외부 링크로 이동 (Linking)
- nativeModule - Swift, Kotlin
- 로컬 푸시 노티피케이션 이용
  - 푸시 알림 예약
  - 푸시 알림 예약 취소
  - 예약된 푸시 알림목록 가져오기

===================================

1. 영화 리스트 구현하기

- Statusbar 컴포넌트 이용 -> 상태표시줄 스타일 변경

* 설치
  npm install open-color
  npm install axios
  npm install @tanstack/react-query
  npm install moment

- # 외부 API 사용 : www.themoviedb.org

2. 영화 상세페이지 구현

- API 호출
- Horizontal List 구현
- Linking API 이용하여 외부 링크로 이동

3-1. ios 캘린더 이벤트 등록 (NativeModules)

- ios의 EventKit프레임 이용
- swift 이용하여 작성 (Xcode)
  - 모듈 파일 > Swift File (브릿지헤더파일 함께 만들기),
  - 브릿지 파일 > Object-C File

* 네이티브 모듈이 필요한 경우 ?
  - JS로 구현되지 않은 ios 및 android에서 제공하는 기능을 사용하고 싶을 때
    예) 퍼미션 요청, 결제 등
  - Objective-C, Java 등으로 쓰여진 라이브러리를 JS로 다시 작성하지 않고 사용할 때
  - 이미지 프로세싱과 같은 고성능 및 멀티스레드 코드를 네이티브 쪽에서 실행할 때

- NativeModule은 JS를 이용해서 Java, Objective-C 등으로 작성된 코드들을 실행할 수 있게 도와줌

3-2. Android 캘린더 이벤트 등록 (NativeModules)

- android의 calendar Provider API 이용
- Kotlin 이용하여 작성 (안드로이드 스튜디오)

4. 개봉일에 푸시 알림을 예약하는 기능 구현

- Local Push Notification 이용
  npm install --save @notifee/react-native
- 예약된 푸시 알림 리스트 구현
- 푸시 알림 취소 기능 구현

5. 광고를 통해 앱을 수익화

- 기능 : 배너 광고, 보상형 광고
- Admob 이용하여 앱에 광고 설치& 수익화 해보기
- 배너 광고 설치
- 앱 기능을 제한하고 광고를 시청한 사용자에게 리워드 주기
- useImperativeHandle 훅을 이용해서 부모 컴포넌트에 노출되는 인스턴스 값을 사용자화 해보기
