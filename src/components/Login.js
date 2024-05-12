import React, {
    useRef,
    useState
} from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        // Validate The Form Data

        console.log(email.current.value);
        console.log(password.current.value);

        const message = checkValidData(email.current.value, password.current.value);

        setErrorMessage(message);
        console.log(message);

        if (message) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/78134236?s=400&u=b547818250e5298a4ba6e3f949d611848fe9ef65&v=4"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser(
                            {
                                uid: uid,
                                email: email,
                                displayName: displayName,
                                photoURL: photoURL
                            }
                        ));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }

    }


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/31ef2c5c-3d08-47d5-b7a9-f29e4f4f893d/1ac1cee7-5580-4cfa-b701-99d1a8f2d148/IN-en-20240506-POP_SIGNUP_TWO_WEEKS-perspective_WEB_ebbef551-d229-4865-8cdc-fb00f8960227_large.jpg"
                    alt='logo' />
            </div>

            <form onSubmit={(e) => e.preventDefault()}
                className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="p-4 my-4  w-full bg-gray-700 "
                />}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email"
                    className="p-4 my-4  w-full bg-gray-700 "
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700"
                />

                <p className="text-red-500">{errorMessage}</p>

                <button className="p-4 my-6 w-full rounded-lg bg-red-700" onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New To Netflix? Sign Up Now" : "Already registered? Sign In Now."}
                </p>
            </form>
        </div >
    )
}

export default Login