import React, { useState } from 'react'
import Add from '../img/man.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [err, setErr] = useState(false);
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
       //Create a unique image name
      const date = new Date().getTime();
       const storageRef = ref(storage, displayName);

      // const uploadTask = uploadBytesResumable(storageRef, file);
 
       await uploadBytesResumable(storageRef, file).then(() => {
      // uploadTask.on(
      // (error)=> {
      //   setErr(true);
      // },
      // ()=>{
         getDownloadURL(storageRef).then(async (downloadURL) => {
           try {
             //Update profile
             await updateProfile(res.user, {
               displayName,
               photoURL: downloadURL,
             });
             //create user on firestore
             await setDoc(doc(db, "users", res.user.uid), {
               uid: res.user.uid,
               displayName,
               email,
               photoURL: downloadURL,
             });
 
             //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
             navigate("/");
           } catch (err) {
             console.log(err);
             setErr(true);
             setLoading(false);
           }
         });
       });
    }
    catch(err) {
    setErr(true);
    setLoading(false);
  }
  };


  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Adi-Chat</span>
            <span className="title">Register Here</span>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder='Your name' />
                <input required type="email" placeholder='Email-id' />
                <input required type="password" placeholder='Password' />
                <input required style= {{display: 'none'}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt='' />
                    <span>Add your Avatar</span>
                </label>
                <button disabled={loading}>Sign Up</button>
                {loading && "Uploading and compressing the image please wait..."}
                {err && <span>Something went wrong</span>}
            </form>
            <p>Login if you have an account -: <br /><Link to="/login">Login!</Link>
            </p>
        </div>
        <a href='#' className='design'>Designed By- Aditya Shivhare</a>
    </div>
  );
};

export default Register;


// import React, { useState } from 'react'
// import Add from '../img/man.png'
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";


// const Register = () => {
//   const [err, setErr] = useState(false);
//   // const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     //setLoading(true);
//     e.preventDefault();
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];
//     try{
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//        //Create a unique image name
//      // const date = new Date().getTime();
//        const storageRef = ref(storage, displayName);

//        const uploadTask = uploadBytesResumable(storageRef, file);
 
//      //  await uploadBytesResumable(storageRef, file).then(() => {
//       uploadTask.on(
//       (error)=> {
//         setErr(true);
//       },
//       ()=>{
//          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//           // try {
//              //Update profile
//              await updateProfile(res.user, {
//                displayName,
//                photoURL: downloadURL,
//              });
//              //create user on firestore
//              await setDoc(doc(db, "users", res.user.uid), {
//                uid: res.user.uid,
//                displayName,
//                email,
//                photoURL: downloadURL,
//              });
 
//              //create empty user chats on firestore
//               await setDoc(doc(db, "userChats", res.user.uid), {});
//              navigate("/");
//           //  } catch (err) {
//           //    console.log(err);
//           //    setErr(true);
//           //    setLoading(false);
//           //  }
//          });
//        }
//       );

//     }
//     catch(err) {
//     setErr(true);
//   }
//   };


//   return (
//     <div className="formContainer">
//         <div className="formWrapper">
//             <span className="logo">Chit-Chat</span>
//             <span className="title">Register Here</span>
//             <form onSubmit={handleSubmit}>
//                 <input required type="text" placeholder='Your name' />
//                 <input required type="email" placeholder='Email-id' />
//                 <input required type="password" placeholder='Password' />
//                 <input required style= {{display: 'none'}} type="file" id='file'/>
//                 <label htmlFor="file">
//                     <img src={Add} alt='' />
//                     <span>Add your Avatar</span>
//                 </label>
//                 <button>Sign Up</button>
//                 {err && <span>Something went wrong</span>}
//             </form>
//             <p>Login if you have an account -: <Link to="/register">Login!</Link>
//             </p>
//         </div>
//     </div>
//   );
// };

// export default Register;