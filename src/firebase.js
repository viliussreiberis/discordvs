import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCberIu_RZSA8fjJDFxKTrLA2Lsl-Q6cyc",
  authDomain: "discord-clone-react-45537.firebaseapp.com",
  projectId: "discord-clone-react-45537",
  storageBucket: "discord-clone-react-45537.appspot.com",
  messagingSenderId: "820874212209",
  appId: "1:820874212209:web:c833d8dfa8e25eacc83cd0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// export { auth, provider };
// export default db;

export const authentication = getAuth(app);

export default getFirestore();
