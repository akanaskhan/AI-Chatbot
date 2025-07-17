import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Loader from "../components/Loader.jsx";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ isLogin: false });
  const [loader, setLoader] = useState(true);
  const [userData, setUserData] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const q = query(collection(db, "users"), where("uid", "==", firebaseUser.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            console.log(docData.photoUrl);
            setUser({
              isLogin: true,
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: docData.displayName,
              photoUrl: docData.photoUrl,
            });
            setUserData(docData);
            setDisplayName(docData.displayName);
          } else {
            console.warn("No user document found in Firestore.");
            setUser({
              isLogin: true,
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
          setUser({ isLogin: false });
        }
      } else {
        setUser({ isLogin: false });
      }
      setLoader(false);
    });

    return () => unsubscribe();
  }, []);

  if (loader) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, userData, displayName }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
