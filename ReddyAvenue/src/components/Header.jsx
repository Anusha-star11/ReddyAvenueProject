import {useDispatch} from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const dispatch=useDispatch();
  
  const handleSignout=async()=>{
    try{
      const baseURL = 'http://localhost:3147';
      const res=await fetch(`${baseURL}/api/user/signout`, {
        method:"POST",
      })
      const data=await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
          dispatch(signoutSuccess());
      }

    }catch(error){
      console.log(error.message);
    }

  };
  return (
    <header className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <a href="#" className="hover:text-blue-700">Reddy Avenue</a>
      </div>
      <nav className="space-x-4 flex items-center">
        <a href="/" className="hover:text-blue-700">Home</a>
        <a href="/about" className="hover:text-blue-700">About</a>
        <a href="/contact" className="hover:text-blue-700">Contact</a>
      </nav>
      <div className="relative flex items-center">
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-white-200 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full">
          Go
        </button>
      </div>
      <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4" onClick={handleSignout}>
        Logout
      </button>
    </div>
  </header>
  )
}
