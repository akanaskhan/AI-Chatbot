import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Spin } from "antd";
import Loader from "../components/loader";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({ isLogin: false });
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          const userInfo = (await getDoc(docRef)).data();
         
          setUser({
            isLogin: true,
            uid: user.uid,
            ...userInfo,
          });

          console.log(user.uid) 
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUser({ isLogin: false }); 
        }
      } else {
        setUser({ isLogin: false });
      }
      setLoader(false);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loader ? (
        <div className="flex h-screen justify-center items-center">
         <Loader/>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
