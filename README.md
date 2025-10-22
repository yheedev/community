# 커뮤니티 앱 과제

## 📱 프로젝트 개요

React Native와 Expo를 활용한 커뮤니티 앱 개발 과제

## 구현 기능

- 회원가입
  - 입력 validation (ID, 이메일, 비밀번호 검증)
  - 중복 확인 로직
- 로그인
  - 로그인 후 메인 페이지 이동
  - 유저 전용 페이지 렌더링

## 🛠 기술 스택

- **Frontend**: React Native 0.81.4
- **Framework**: Expo SDK 54
- **Router**: Expo Router 6.0
- **Language**: TypeScript
- **Storage**: AsyncStorage / localStorage

## ⚙️ 실행 방법

```bash
npm install
npx expo start

# 웹: 브라우저에서 localhost:8081 접속
# 모바일: Expo Go 앱으로 QR 스캔 또는 exp:// URL 입력
```

## 📂 프로젝트 구조

```
community/
├── app/
│   ├── (auth)/
│   │   ├── signup.tsx     # 회원가입 화면
│   │   └── login.tsx      # 로그인 화면 (미완성)
│   ├── _layout.tsx
│   └── index.tsx
├── stores/
│   └── auth.ts            # 인증 상태 관리 (Zustand)
├── firebaseConfig.ts      # Firebase 설정 (미사용)
└── package.json
```

## 🚧 개발 과정 및 트러블슈팅

### 1. 주요 기술적 이슈

#### Issue #1: 웹 환경에서 이벤트 핸들러 미작동

```
Uncaught SyntaxError: Cannot use 'import.meta' outside a module
```

- JavaScript 번들 자체가 로드되지 않는 문제
- 웹 브라우저에서 버튼 클릭, 입력 이벤트가 전혀 작동하지 않는 동시에 이미지 렌더링 불가

**원인 분석**:

- Expo Router + React Native Web 환경에서 모듈 해석 충돌
- Metro bundler의 웹 지원 설정 문제
- `nativewind`, `react-native-worklets` 등 일부 패키지의 웹 호환성 문제

**시도한 해결 방법**:

1. Metro 설정 (`metro.config.js`) 및 Babel 설정 (`babel.config.js`) 재구성
2. 캐시 삭제 및 재설치, 문제 패키지 제거

**결과**:

- 웹 환경 문제 해결 실패로 인해 Expo Go 모바일 환경으로 전환

---

#### Issue #2: Firebase 패키지 의존성 충돌

**문제**:

```
Unable to resolve "idb" from "node_modules/@firebase/app/dist/index.cjs.js"
```

- Firebase 12.x 버전과 Expo의 패키지 해석 충돌
- `idb`, `use-latest-callback` 등 하위 의존성 파일 누락

**시도한 해결 방법**:

1. Firebase 버전 다운그레이드 (12.4.0 → 10.13.0)
2. 의존성 패키지 수동 설치 (`idb`, `use-latest-callback`)
3. node_modules 완전 재설치
4. @react-native-firebase 패키지로 교체 시도

**결과**:

- Firebase 연동 보다는 AsyncStorage/localStorage 기반 로컬 저장 방식으로 변경

---

#### Issue #3: React Hook Form 통합 문제

**문제**:

- `handleSubmit` 호출 시 onSubmit 함수가 실행되지 않는 동시에 콘솔 출력도 이뤄지지 않음
- validation 에러 메시지, Alert 컴포넌트도 보이지 않음

**원인**:

- 위의 번들링 문제로 인해 전체적인 이벤트 시스템 마비
- React Hook Form 자체 문제가 아님

**결과**:

- React Hook Form 제거
- 순수 useState 기반 form 처리로 변경

---

### 3. 최종 구현 방식

#### 데이터 저장

- **Firebase** (원래 계획) → **로컬 저장소**로 변경
- 웹: `localStorage` 사용
- 모바일: `AsyncStorage` 사용
- Platform API로 환경 분기 처리

#### 회원가입 로직

```typescript
// 이메일/ID 중복 확인
// validation (정규식 검증)
// 로컬 저장소에 JSON 형태로 저장
// 비밀번호 평문 저장 (실제 서비스에서는 해싱 필요)
```

## 🎓 배운 점 및 회고

### 기술적 학습

1. **React Native ≠ React**

   - React와 React Native는 완전히 다른 생태계였습니다. 패키지 의존성 관리가 웹보다 훨씬 복잡하고, 콘솔을 출력하는 방식도 브라우저와 완전히 다르다는 것을 체감할 수 있었습니다. 또한 플랫폼별 조건부 처리 필요성 체감했습니다.
   - 디버깅을 위해 검색했을 때, 검색 결과가 React와 비교했을 때 매우 적다는 것을 체감했습니다. 이를 통해 유저 수가 많고 오래 쓰이는 라이브러리의 장단점을 좀 더 극명하게 체감할 수 있는 계기가 되었습니다.

2. **의존성 지옥 (Dependency Hell)**
   - Firebase 최신 버전과 Expo의 호환성 문제를 통해, 패키지 하나의 문제가 전체 번들링 실패로 이어지기 때문에 초기 세팅에 많은 리소스가 소요되었습니다.

### 개선 방향

1. **초기 설정의 중요성**

   - 프로젝트 시작 시 안정적인 boilerplate 사용하고 최신 버전보다는 검증된 버전 조합 선택을 하는 것이 좋았겠다는 생각이 듭니다.
   - 앱 개발을 할 때에는 Visual Studio Code 말고 Android Studio에서 처음부터 세팅하는게 좋다는 것을 배웠습니다.

2. **시간 관리**

- 회원가입 기능을 처음 구현하며, 실시간 validation 같은 기능을 구현하고 싶어서 오래 걸렸던 것이 생각납니다. 앞으로는 최소한의 기능을 완성하고 작동 여부를 확인한 뒤에 디테일을 잡는 접근을 해보고자 합니다.

3. **기술 스택 선택**
   - 익숙하지 않은 기술은 충분한 학습 시간의 확보가 필요했으며, Firebase보다 좀 더 익숙하고 쉬운 스택을 선택해보려 합니다.

## 마치며

개인적인 업무로 인한 시간 제약과 기술적 어려움으로 요구사항을 충족하지 못했음에 아쉬움이 느껴집니다. 하지만 React Native 생태계의 복잡성을 체감하고, 문제 해결을 위한 다양한 시도를 했다는 점에서 의미 있는 경험이었습니다.

실무에서는 이러한 트러블슈팅 경험을 바탕으로 초기 기술 스택 선정과 리스크 관리에 더 신중을 기하겠습니다.

## 🔗 참고 자료

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [Firebase 웹 SDK 문서](https://firebase.google.com/docs/web/setup)
