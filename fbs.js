// fbs.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "aiml-studyconnect.firebaseapp.com",
  projectId: "aiml-studyconnect",
  storageBucket: "aiml-studyconnect.appspot.com",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  measurementId: "measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

let isSignInInProgress = false;
window.signInWithGoogle = async function(val = false, onpurpose = false) {
  if(val){
    await auth.signOut();
    console.log("signed out");
    if(!onpurpose){
      showAlert('Your email is not allowed to sign in.',"https://cdn-icons-png.flaticon.com/512/675/675564.png");
    }
    localStorage.setItem("tabcurrentx","home");
    localStorage.setItem("tabcurrenty","AIML StudyConnect");
    localStorage.removeItem("xebiacontent");
    localStorage.removeItem('clanlinks');
    localStorage.removeItem("courseInfo");
    localStorage.removeItem("semesters");
    return null;
  }
  if (isSignInInProgress) {
    return null; // Exit early if sign-in is already in progress
  }
  
  isSignInInProgress = true;
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account' // Prompt for account selection
  });

  let popupWindow = null;
  const checkPopupInterval = 1000; // Check every 1 second
  let popupChecker;

  try {
    // Open the sign-in popup and capture the window reference
    const result = await new Promise((resolve, reject) => {
      popupWindow = signInWithPopup(auth, provider);
      
      popupChecker = setInterval(() => {
        if (popupWindow && popupWindow.closed) {
          clearInterval(popupChecker);
          isSignInInProgress = false; // Reset the flag if popup was closed
          showAlert('Sign-in was canceled.',"https://cdn-icons-png.flaticon.com/512/675/675564.png");
          reject(new Error('Popup closed by user'));
        }
      }, checkPopupInterval);
      
      popupWindow.then(resolve).catch(reject);
    });

    clearInterval(popupChecker); // Clear the interval if sign-in completes

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    
    localStorage.setItem("efusereId", user.email);
    console.log("your email: ");
    console.log(user.email);
    console.log("Successfully signed")
    return user;

  } catch (error) {
    showAlert('Your email is not allowed to sign in.',"https://cdn-icons-png.flaticon.com/512/675/675564.png");
    return null;
  
  } finally {
    clearInterval(popupChecker); // Ensure interval is cleared
    isSignInInProgress = false; // Reset the flag after sign-in attempt
  }
}; 
// Function to get collection data
window.loadCollectionData = async function(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error('Error loading', error);
    return [];
  }
}; 

