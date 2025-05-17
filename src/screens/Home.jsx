import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase/firebaseconfig";
import { collection ,deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [post, setPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null)


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Logged in user:", uid);
      } else {
        console.log("User Not Logged IN");
        navigate("/");
      }
    });
  }, []);


  const getLoggedInUserId = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setLoggedInUser(user.uid);
        }
    });
};
useEffect(() => {
    getLoggedInUserId();
}, []);




  const getdata = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postArr = [];
      querySnapshot.forEach((doc) => {
        postArr.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postArr);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };




  return (
    <>
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white shadow-md">
        <h1 className="text-3xl font-bold">Home</h1>
        <div className="space-x-4">
          <button
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={logoutUser}
          >
            Logout
          </button>
          <Link to={"/post"}>
            <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
              Add Post
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {post.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-5 border hover:shadow-xl transition-shadow"
          >
            <img className="w-full my-2" src={item.image} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {item.title || "Untitled Post"}
            </h2>
            <p className="text-gray-600">
              {item.content || "No content available."}
            </p>
            <div className="mt-4 text-sm text-gray-400">Post ID: {item.id}</div>
            
            {item.uid === loggedInUser && (
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={async () => {
                                            await deleteDoc(doc(db, "posts", item.id));
                                            getdata();
                                        }}
                                        className="bg-[#8A0000] text-white border rounded p-2 cursor-pointer"
                                    >
                                        Delete Post
                                    </button>
                                </div>
                            )}
          </div>
          
        ))}
      </div>
    </>
  );
};

export default Home;