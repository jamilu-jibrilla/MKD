import React, { useState } from "react";
import { useEffect } from "react";
import logout from "./logout.png"
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import MkdSDK from "../utils/MkdSDK";
import Card from "../components/Card"


const AdminDashboardPage = () => {
  const [data, setData] = useState([])
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1) 
  useEffect(() => {
    const result = async () => {
      let sdk = new MkdSDK();
      sdk.setTable("video")
      const res = await sdk.callRestAPI({page: page, limit: 10}, "PAGINATE")
      return await res
    }
    result().then((res) => {
      setData(res.list)
    })
  }, [page])
  const handleNext = () => {
    setPage(prev => {
      return prev + 1
    })
  }

  const handlePrev = () => {
    setPage(prev => {
      if(prev > 1)
      return prev - 1
    })
  }

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
    navigate("/admin/login")
  }
  return (
    <>
      <div className="w-full px-[5rem] pt-3 overflow-y-scroll h-screen bg-[#111111]">

        <div className="flex items-center justify-between mb-[4rem]">
          <h1 className="text-[3rem] text-white font-bold">App</h1>
          <button onClick={handleLogout} className="text-white text-md flex">
            <img src={logout} alt="logout icon" />
            logout
          </button>
        </div>


      <div className="flex justify-between text-[#FFFFFF] opacity-[0.5">
          <h1 className="text-[2rem] text-[#FFFFFF]">Today's Leaderboard</h1>
          <span className="text-white flex items-center bg-[#1D1D1D] rounded-[13px] px-5 text-sm">
            <span>30 may 2022</span>
            <span className="rounded-[5px] bg-[#9BFF00] px-[.1rem] text-[12px] text-black mx-[.7rem]">SUBMISSIONS OPEN</span>
            <span>11:34</span>
          </span>
      </div>

      <div className="flex justify-between text-[#FFFFFF] mt-9 mb-[2.4rem] opacity-[0.5]">
        <div className="flex">
          <h4 className="mr-5">#</h4>
          <h4>Title</h4>
        </div>
        <h4>Author</h4>    
        <h4>Most Liked</h4>    
      </div>
      
      { data.length ? 
        data.map((card, index) => {
          return (
          <Card card={card} key={index}/>
          )
        })  
         :
          <div>
           Loading
          </div>            
      }
      <div className="flex justify-center text-md ">
        <button onClick={handlePrev} className="text-[1.2rem] bg-[white] border border-black px-5 mr-3 bg-gray">prev</button>
        <button 
          onClick={handleNext} 
        className=" bg-[white] text-[1.2rem] border border-black px-5 bg-gray">next</button>
      </div>



      </div>
    </>
  );
};

export default AdminDashboardPage;
