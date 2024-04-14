import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBpgIUnKGQrYHH_aRzp5uN8LxtjwCtJ3ek",
  authDomain: "pokedex-react-project.firebaseapp.com",
  projectId: "pokedex-react-project",
  storageBucket: "pokedex-react-project.appspot.com",
  messagingSenderId: "430357746582",
  appId: "1:430357746582:web:8d73232e922355e9fa43b7",
  measurementId: "G-C8JRZWSNEL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    //Used this code to check the persistence of the user session
    //Removed console.log statement 
  })
  .catch((error) => {
    // Removed console.error statement
  });

export { auth, app };