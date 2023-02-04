import { useState } from "react"
import {useDrag} from "react-dnd"
import likes from "./likes.png"

const Card = ({card, handleDrag}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: {id: card.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
    return (
        <div 
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
            id={card.id}
            onDragEnter={handleDrag}
                className=" flex justify-between items-center border border-[#FFFFFF1F] px-3 rounded-[16px] text-[#666666] mt-5 ">
          <div className="flex items-center w-[30%] ">
            <h4 className="mr-5 ">#</h4>
            <div className="h-[90px] w-[200px] overflow-hidden  mr-3 mt-3 rounded-[4px] ">
              <img src={card.photo ? card.photo :"https://picsum.photos/seed/picsum/200/200"} className="h-[70px] w-[200px]" />
            </div>
            <h4 className="">{card.title}</h4>
          </div>
          <h4 className="w-[35%] opacity-[0.5] text-[16px] text-[#DBFD51]">mananight</h4>    
          
          <h4 className="flex items-center mr-3">{card.like} <img className="ml-1" src={likes} alt="" /></h4>    
          </div>
    )
}

export default Card