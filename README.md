# 🎬 Movie Release Reminder

영화 정보를 조회하고 개봉일에 대한 알림을 받을 수 있는 React Native 모바일 앱입니다.

## 📱 프로젝트 소개

TMDB(The Movie Database) API를 활용하여 최신 영화 정보를 제공하고, 사용자가 관심 있는 영화의 개봉일을 캘린더에 추가하거나 푸시 알림으로 받아볼 수 있는 앱입니다. iOS와 Android 양쪽 플랫폼을 지원하며, 네이티브 모듈을 활용하여 플랫폼별 특화 기능을 구현했습니다.

## ✨ 주요 기능

### 1. 영화 정보 조회

- 인기 영화 리스트 조회
- 영화 상세 정보 확인 (제목, 줄거리, 평점, 출연진 등)
- 관련 영화 추천 리스트
- 외부 링크를 통한 예고편 및 상세 정보 확인

### 2. 캘린더 연동

- 영화 개봉일을 기기 캘린더에 자동 추가
- iOS: EventKit 프레임워크 활용 (Swift)
- Android: Calendar Provider API 활용 (Kotlin)
- 네이티브 모듈을 통한 플랫폼별 최적화 구현

### 3. 푸시 알림

- 영화 개봉일 푸시 알림 예약
- 예약된 알림 목록 확인
- 알림 취소 기능
- 로컬 푸시 노티피케이션 활용

## 🛠 기술 스택

### Frontend

- **React Native** 0.74.3
- **TypeScript**
- **React Navigation** - 네비게이션 관리
- **TanStack Query (React Query)** - 서버 상태 관리 및 API 호출
- **Axios** - HTTP 클라이언트

### Native Modules

- **iOS**: Swift + Objective-C (EventKit)
- **Android**: Kotlin (Calendar Provider API)

### 기타 라이브러리

- **@notifee/react-native** - 로컬 푸시 알림
- **Moment.js** - 날짜 처리
- **FontAwesome** - 아이콘

## 📸 시현 영상

> 💡 **시현 영상 제안:**
>
> 다음 내용을 포함한 1-2분 분량의 시연 영상이 효과적입니다:
>
> 1. **앱 시작 화면** - 앱 로딩 및 첫 화면
> 2. **영화 리스트 탐색** - 스크롤, 영화 카드 확인
> 3. **영화 상세 정보** - 상세 페이지 이동, 정보 확인
> 4. **캘린더 추가 기능** - 개봉일 캘린더에 추가하는 과정
> 5. **푸시 알림 예약** - 알림 설정 및 예약된 알림 목록 확인
> 6. **푸시 알림 수신** - 실제 알림이 오는 모습 (시뮬레이션 가능)

```
[시현 영상 링크를 여기에 추가하세요]
예: YouTube, Vimeo, 또는 GIF 링크
```

## 🚀 설치 및 실행

### 사전 요구사항

- Node.js >= 18
- React Native 개발 환경 설정
- iOS: Xcode 및 CocoaPods
- Android: Android Studio 및 JDK

### 설치

```bash
# 의존성 설치
npm install

# iOS 의존성 설치
cd ios && pod install && cd ..
```

### 실행

```bash
# Metro 번들러 시작
npm start

# iOS 실행
npm run ios

# Android 실행
npm run android
```

## 📁 프로젝트 구조

```
├── src/
│   ├── components/        # 재사용 가능한 컴포넌트
│   ├── screens/           # 화면 컴포넌트
│   │   ├── MoviesScreen/  # 영화 리스트 화면
│   │   ├── MovieScreen/   # 영화 상세 화면
│   │   └── RemindersScreen/ # 알림 목록 화면
│   ├── hooks/             # 커스텀 훅
│   ├── modules/           # 모듈 (API, Native Modules)
│   └── types.tsx          # TypeScript 타입 정의
├── ios/                   # iOS 네이티브 코드
│   ├── CalendarModule.swift
│   └── CalendarModuleBridge.m
└── android/               # Android 네이티브 코드
    └── app/src/main/java/
```

## 🎯 주요 구현 내용

### 1. 네이티브 모듈 구현

- **iOS**: Swift로 EventKit을 활용한 캘린더 이벤트 추가
- **Android**: Kotlin으로 Calendar Provider API 활용
- React Native 브릿지를 통한 JavaScript와 네이티브 코드 통신

### 2. 상태 관리

- TanStack Query를 활용한 서버 상태 관리
- 효율적인 데이터 캐싱 및 리패칭 전략

### 3. 사용자 경험

- 안전 영역(Safe Area) 처리
- 로딩 상태 및 에러 처리
- 부드러운 네비게이션 전환

## 📚 학습한 내용

- React Native 크로스 플랫폼 개발
- 네이티브 모듈 개발 (Swift, Kotlin)
- React Query를 활용한 서버 상태 관리
- 로컬 푸시 알림 구현
- 외부 API 연동 (TMDB API)
- TypeScript를 활용한 타입 안정성

## 🔗 외부 API

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - 영화 데이터 제공

## 📄 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.
