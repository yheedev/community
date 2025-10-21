import { getApps, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgBc-SIWQ8zA-h-_68vIGQipKGr48vjMM",
  authDomain: "community-5089d.firebaseapp.com",
  projectId: "community-5089d",
  storageBucket: "community-5089d.firebasestorage.app",
  messagingSenderId: "856358041383",
  appId: "1:856358041383:web:e779dc327190db0a631b02",
  measurementId: "G-2DP1CMFD61",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 웹에선 로컬 스토리지로 로그인 유지
setPersistence(auth, browserLocalPersistence);

// 크롬 콘솔 테스트하고 싶을 때 디버그 노출
// if (typeof window !== "undefined") {
//   // @ts-ignore
//   window.__auth = auth;
// }

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
