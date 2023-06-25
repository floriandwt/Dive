import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
const style = {
//   height: '12rem',
//   width: '12rem',
//   marginRight: '1.5rem',
//   marginBottom: '1.5rem',
//   color: 'white',
//   padding: '1rem',
//   textAlign: 'center',
//   fontSize: '1rem',
//   lineHeight: 'normal',
//   float: 'left',
}
export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#e4e4e7'
  if (isActive) {
    backgroundColor = '#22c55e'
  } else if (canDrop) {
    backgroundColor = '#d4d4d8'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }} className="text-black w-full h-96 flex items-center justify-center mb-8 rounded-3xl" data-testid="dustbin">
      <h1 className="text-3xl font-medium opacity-25">{isActive ? 'Release to set Buddy' : 'Drag a Buddy here'}</h1>
    </div>
  )
}
