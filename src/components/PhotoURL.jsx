import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function PhotoURL() {
      const { user, displayName, photoUrl } = useContext(AuthContext);
    
    
    return (
        <>
            <div>
                <img className="w-96 h-96 " src={user.photoUrl} alt="photo" />
            </div>
        </>
    );
}