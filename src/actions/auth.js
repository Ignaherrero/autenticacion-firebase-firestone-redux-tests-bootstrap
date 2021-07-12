import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import types from "../types/types";
import { noteLogout } from "./notes";
import { finishLogin, startLogin } from "./ui";

export const login = (uid, uname) => ({
  type: types.login,
  payload: { uid, uname },
});

export const logOut = () => ({
  type: types.logout,
});

export const starRegisterWithEmail = ({ email, password, name }) => {
  return (dispatch) => {
    dispatch(startLogin());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch(({ message }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      });
  };
};

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLogin());
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLogin());
      })
      .catch(({ message }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
        dispatch(finishLogin());
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    dispatch(startLogin());
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLogin());
      });
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logOut());
    dispatch(noteLogout());
  };
};
