import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBA5AA0nla8S0WgtGm3-iZBM7tTgP8A_dY",
  authDomain: "lagom-app-54608.firebaseapp.com",
  projectId: "lagom-app-54608",
  storageBucket: "lagom-app-54608.appspot.com",
  messagingSenderId: "218172052233",
  appId: "1:218172052233:web:8d1231431c13167dddf9d8",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db }; // Import the functions you need from the SDKs you need
