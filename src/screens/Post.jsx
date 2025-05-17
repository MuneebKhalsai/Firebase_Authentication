import { useNavigate } from "react-router-dom"
import { useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db,auth } from "../config/firebase/firebaseconfig";
import { addDoc,collection, serverTimestamp } from "firebase/firestore";
const Post = () => {

  const navigate = useNavigate();
  const text = useRef();
  const title = useRef();
  const image = useRef();

  const post = async (event) =>{
    event.preventDefault();

    try{
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.current.value,
        content: text.current.value,

        uid: auth.currentUser.uid
    });
    console.log("Document written with ID: ", docRef.id);
    }

    catch (e){
      console.error("Error Adding",e);


    }

    navigate('/home')
    
      text.current.value= '' 
    title.current.value=''
      PostAt: serverTimestamp()
  }


  onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        navigate('/')
    }
});



    return(
        <>
    
        <div className=" w-100 ml-170 mt-60 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Post & Image</h2>
      <form className="space-y-4" onSubmit={post}>
      

        <input 
          type="title" ref={title}
          placeholder="Enter Title"className="w-full px-2  h-15 border rounded " required />

<input 
          type="text" ref={text}
          placeholder="Enter Description" className="w-full px-2  h-15 border rounded "required/>

          <input type="file" ref={image} className="w-full px-2  h-15 border rounded p-4" required/>
 <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Share Post
        </button>
      </form>
    </div>
        </>
    )
}
export default Post