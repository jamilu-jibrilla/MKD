import {useDrag} from "react-dnd"

const Card = ({card}) => {
    const [{isDragging }, drag] = useDrag({
        type: "div",
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    })
    return (
        <div
            ref={drag}  
            className={` ${isDragging ? "border border-[red]" : ""}flex justify-between  text-[#FFFFFF] mt-5 opacity-[0.5] `}>
          <div className="flex items-center w-[30%] ">
            <h4 className="mr-5">#</h4>
            <div className="h-[100px] w-order[100px] overflow-hidden  mr-3 mt-3 rounded-[4px] ">
              <img src={card.photo ? card.photo :"https://picsum.photos/seed/picsum/200/200"} className="h-[auto] w-[auto]" />
            </div>
            <h4>{card.title}</h4>
          </div>
          <h4 className="w-[29%]">Author</h4>    
          <h4>Most Liked</h4>    
          </div>
    )
}

export default Card