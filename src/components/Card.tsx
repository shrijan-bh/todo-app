import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface ICardProps{
    item: string;
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    delOnClickFunction: (item: string) => void;
}

const Card = ({ item, provided, snapshot, delOnClickFunction }: ICardProps) => {

  return (
    <div key={item} className="todoItem" ref={provided.innerRef}
    data-snapshot={snapshot}
    {...provided.draggableProps}
    {...provided.dragHandleProps}>
            <p className="todoName" style={{ display: "inline-block" }}>
              {item}
            </p>
            <button
              type="button"
              className="deleteButton"
              onClick={() => delOnClickFunction(item)}
            >
              ❌
            </button>
          </div>
    
  );
};

export default Card;
