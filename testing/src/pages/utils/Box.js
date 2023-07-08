import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import Image from "next/image.js";
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
      style={{ opacity, cursor }}
      className="px-8 py-4 flex-grow rounded-lg bg-transparent text-center border border-zinc-200 float-left overflow-hidden active:cursor-grabbing cursor-grab"
      data-testid={`box`}
    >
      
      {name}
    </div>
  );
};
