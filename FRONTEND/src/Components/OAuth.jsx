import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useCookies } from 'react-cookie';

 function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [_, setCookie] = useCookies(["token"]);
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL
        }),
      });
     

      const Data = await res.json();
      dispatch(signInSuccess(Data));
      setCookie("token", Data.data);
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <div>
      <button className="bg-blue-700 text-white p-3 rounded-lg flex justify-center items-center uppercase hover:opacity-75 disabled:opacity-80 max-w-md mx-auto"
      type='button'
      onClick={handleGoogleAuth}
      >
        <span className="pr-2">
          <FaGoogle size={24} />
        </span>
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
