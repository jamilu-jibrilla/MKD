import React, { useState } from "react";
import { useEffect } from "react";

const AdminDashboardPage = () => {
  const [nextPage, setNextpage] = useState (1)
  const [prevPage, setPrevpage] = useState(1)
  const [data, setData] = useState([])

  useEffect(()=> {
    
    const URL = "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE" 
    const data = {
      payload: {},
      page: 1,
      limit: 10,
    }
    const requestObj = {
      method: 'post',
      headers: {
      'Content-Type': 'application/json',
      'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5dWjZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
      "Authorization": "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(data),
    }
    const res = fetch(URL, requestObj)
    .then(res => res.json())
    .then(res => setData(res))

  }, [])
  
  console.log(data)
  return (
    <>
      <div className="w-full px-[5rem] pt-3  h-screen bg-[#111111]">

        <div className="flex items-center justify-between mb-[4rem]">
          <h1 className="text-[3rem] text-white font-bold">App</h1>
          <button className="text-white text-md">
            <img src="" alt="logout icon" />
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

      <div className="flex justify-between text-[#FFFFFF] mt-5 opacity-[0.5]">
        <div className="flex">
          <h4 className="mr-5">#</h4>
          <h4>Title</h4>
        </div>
        <h4>Author</h4>    
        <h4>Most Liked</h4>    
      </div>

      <div className="flex justify-between  text-[#FFFFFF] mt-5 opacity-[0.5]">
        <div className="flex items-center w-[30%] ">
          <h4 className="mr-5">#</h4>
          <div className="h-[33px] mr-3 w-[60px] rounded-[4px] bg-white"></div>
          <h4>Rune raises $100,000 for marketing through NFT butterflies sale</h4>
        </div>
        <h4 className="w-[30%]">Author</h4>    
        <h4>Most Liked</h4>    
      </div>


      </div>
    </>
  );
};

export default AdminDashboardPage;
