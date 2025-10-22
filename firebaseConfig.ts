import { getApp, getApps, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCgBc-SIWQ8zA-h-_68vIGQipKGr48vjMM',
  authDomain: 'community-5089d.firebaseapp.com',
  projectId: 'community-5089d',
  storageBucket: 'community-5089d.firebasestorage.app',
  messagingSenderId: '856358041383',
  appId: '1:856358041383:web:e779dc327190db0a631b02',
  measurementId: 'G-2DP1CMFD61',
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// 로컬 스토리지에 세션 유지
setPersistence(auth, browserLocalPersistence);

// 크롬 콘솔에서 테스트하고 싶을 때(선택)
// window.__auth로 노출되면 devtools에서 바로 써볼 수 있음
if (typeof window !== 'undefined') {
  (window as any).__auth = auth;
}

export { app, auth };
