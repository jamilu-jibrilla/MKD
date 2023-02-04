import { useState } from "react"
import {useDrag} from "react-dnd"

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
                className=" flex justify-between items-center  text-[#FFFFFF] mt-5 ">
          <div className="flex items-center w-[30%] ">
            <h4 className="mr-5 opacity-[0.7]">#</h4>
            <div className="h-[90px] w-[200px] overflow-hidden  mr-3 mt-3 rounded-[4px] ">
              <img src={card.photo ? card.photo :"https://picsum.photos/seed/picsum/200/200"} className="h-[auto] w-[auto]" />
            </div>
            <h4 className="opacity-[0.7]">{card.title}</h4>
          </div>
          <h4 className="w-[29%] opacity-[0.7]">mananight</h4>    
          <h4 className="opacity-[0.7]">Most Liked</h4>    
          </div>
    )
}

export default Card