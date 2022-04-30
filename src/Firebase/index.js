import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhyj0If8Okn3lmGetp5SvAjjG4MqJY4e0',
  authDomain: 'datn-spa.firebaseapp.com',
  projectId: 'datn-spa',
  storageBucket: 'datn-spa.appspot.com',
  messagingSenderId: '937754482343',
  appId: '1:937754482343:web:65f72fa3d8b928214bed82',
  measurementId: 'G-C5KEQYHBRZ'
};

firebase.initializeApp(firebaseConfig);
export default firebase;

export const auth = firebase.auth();
/** login with google */
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: 'select_account'
});
export const signInWithGoogle = () =>
  auth.signOut().then(() =>
    auth.signInWithPopup(providerGoogle).catch((error) => {
      return error;
    })
  );

/** login with facebook */
const providerFaceBook = new firebase.auth.FacebookAuthProvider();
export const signInWithFacebook = () => {
  auth.signOut().then(() =>
    auth.signInWithPopup(providerFaceBook).catch((error) => {
      return error;
    })
  );
};

/**
 *
 * @param {*} onSignInSubmit  hàm call submit data client
 * @param {*} sign id của khối cần nhúng capcha
 *
 */
export const configCapCha = (onSignInSubmit, sign) => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(sign, {
    size: 'invisible',
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    },
    defaultCountry: 'IN'
  });
};

/**
 *
 * @param {*} phoneNumber số điện thoại cần send SMS
 * @returns boolean: true | false
 */
export const signInWithNumberPhone = (phoneNumber) => {
  const appVerifier = window.recaptchaVerifier;
  return firebase
    .auth()
    .signInWithPhoneNumber('+84' + phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      return true;
    })
    .catch((error) => {
      return false;
    });
};

/**
 *
 * @param {*} code mã code từ SMS
 * @returns trả về thông tin user | false
 */
export const verifyNumberPhone = (code) => {
  return window.confirmationResult
    .confirm(code)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      return false;
    });
};
