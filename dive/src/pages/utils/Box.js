import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
const style = {
  //   border: "1px dashed gray",
  //   backgroundColor: "white",
  //   padding: "0.5rem 1rem",
  //   marginRight: "1.5rem",
  //   marginBottom: "1.5rem",
  //   cursor: "move",
  //   float: "left",
};
export const Box = function Box({ name, image, setBuddy }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          // alert(`You dropped ${item.name} into ${dropResult.name}!`);
          setBuddy(item.name);
        }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  const cursor = isDragging ? "grabbing" : "grab";
  return (
    <div
      ref={drag}
      style={{ ...style, opacity, cursor }}
      className="px-8 py-4 flex-grow rounded-lg bg-transparent text-center border border-zinc-200 float-left overflow-hidden active:cursor-grabbing cursor-grab"
      data-testid={`box`}
    >
      {name}
    </div>
  );
};
