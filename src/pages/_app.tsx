import type { AppProps /*, AppContext */ } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { loginWithGoogle } from "@redux/user/userSlice";
import localStore from "@utils/localStore";
import store from "@redux/store";
import firebase from "@utils/firebase";
import firebaseConfig from "../../firebase.config.json";
import "../styles/globals.scss";

if (typeof window !== "undefined" && firebase.apps.length === 0) {
  console.log("INITIALIZE_APP");
  firebase.initializeApp(firebaseConfig);
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const token = localStore.get("token");
    if (!token) {
      router.replace("/login");
    } else {
      firebase
        .auth()
        .signInWithCredential(
          firebase.auth.GoogleAuthProvider.credential(token)
        )
        .then((credential) => {
          store.dispatch(loginWithGoogle(credential) as any);
        })
        .catch((error) => {
          localStore.clear("token");
          router.replace("/login");
          console.log("ERROR: ", error);
        });
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
