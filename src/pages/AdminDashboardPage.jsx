import React, { useState } from "react";
import { useEffect } from "react";
import logout from "./logout.png"
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router-dom";
import MkdSDK from "../utils/MkdSDK";
import Card from "../components/Card"
import { useDrop } from "react-dnd";

const AdminDashboardPage = () => {
  const [data, setData] = useState([])
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1) 
  const [dragId, setDragId] = useState(0)
  
  const handleDrag = (e) => {
    e.stopPropagation()
    setDragId(e.currentTarget.id)
  }
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

  const [{isOver}, drop] = useDrop(()=> ({
    accept: "div",
    drop: (item) => addDivToContainer(item.id, dragId),
    collect: (monitor) => ({
      isOver : !!monitor.isOver()
    })
  }), [dragId, setDragId])
  const addDivToContainer = (id, dragNo) => {
    setData((prev) => {
      let arr = [...prev]
      let item = arr.filter(item => item.id === id)
      const itemIndex = arr.indexOf(item[0])

      let items = arr.filter(item => item.id !== id)
      arr = [...items]
      
      let dropItem = arr.filter(item => item.id == dragNo)
      const dropItemIndex = arr.indexOf(dropItem[0])+1

      if(itemIndex < dropItemIndex) {
        arr.splice(dropItemIndex, 0, item[0])
      } else {
        arr.splice(dropItemIndex-1, 0, item[0])
      }

      return arr
    })
  }


  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
    navigate("/admin/login")
  }
  return (
    <>
      <div className="w-full px-[5rem] pt-3 overflow-y-scroll h-screen bg-[#111111]">

        <div className="flex items-center justify-between mb-[4rem] ">
          <h1 className="text-[3rem] text-white font-bold">App</h1>
          <button onClick={handleLogout} className="text-white text-md bg-[#9BFF00] px-4 py-2 text-[#050505] rounded-[20px] flex">
            <img className="mr-1" src={logout} alt="logout icon" />
            logout
          </button>
        </div>


      <div className="flex justify-between">
          <h1 className="text-[2rem] text-[#666666]">Today's Leaderboard</h1>
          <span className="text-[#666666] flex items-center bg-[#1D1D1D] rounded-[13px] px-5 text-sm">
            <span>30 may 2022</span>
            <span className=" ml-2 mb-2 text-[#666666]">.</span>
            <span className="rounded-[5px] bg-[#9BFF00] px-[.1rem] text-[12px] text-black mx-[.7rem]">SUBMISSIONS OPEN</span>
            <span className=" mr-2 mb-2 text-[#666666]">.</span>            
            <span>11:34</span>
          </span>
      </div>

      <div className="flex justify-between px-3 text-[#666666] mt-9 mb-[2.4rem] ">
        <div className="flex">
          <h4 className="mr-5">#</h4>
          <h4>Title</h4>
        </div>
        <h4>Author</h4>    
        <h4>Most Liked</h4>    
      </div>

      <div ref={drop}>
      { data.length ? 
        data.map((card, index) => {
          return (
          <Card handleDrag={handleDrag} card={card} key={card.id}/>
          )
        })  
         :
          <div className="text-center text-white">
           Loading...
          </div>            
      }
      </div>
      <div className={`${!data.length ? "hidden" : ""} flex justify-center text-md py-8`}>
        <button onClick={handlePrev} className="text-[1.2rem] bg-[white] bo w-[100px] rounded-[12px] px-5 mr-[1rem] bg-gray">prev</button>
        <button 
          onClick={handleNext} 
        className=" bg-[white] text-[1.2rem] ml-5 w-[100px] rounded-[12px] px-5 bg-gray">next</button>
      </div>



      </div>
    </>
  );
};

export default AdminDashboardPage;