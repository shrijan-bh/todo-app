import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import "../styles/main.css";
import { ToastContainer } from "react-toastify";
import { toastHook } from "../hooks/toastHook";
import { Link } from "react-router-dom";
import { DragDropContext, DragUpdate, Draggable, DraggableProps, Droppable, DroppableProvided } from "react-beautiful-dnd";
import Card from "../components/Card";


const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const storageItems = JSON.parse(localStorage.getItem("items") || "[]");
  const [todoLists, setTodoLists] = useState<string[]>(storageItems);
  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(e.target.value);
  };

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(todoLists.length < 5){
      if (!todoLists.includes(todoItem)) {
        setTodoLists((prev) => [...prev, todoItem]);
        toastHook({
          message: "Sucessfully added",
          type: "success",
        });
      } else {
        toastHook({
          message: "Value repeated",
          type: "warning",
        });
      }
    }
    else{
      toastHook({
        message: "Maximum allowed number of task is 5.",
        type: "warning",
      });
    }
    setTodoItem("");
  };

  const delOnClick = (item: string) => {
    const answer = todoLists.includes(item);
    answer
      ? (setTodoLists((current) => current.filter((ite) => ite !== item)),
        toastHook({
          message: "Sucessfully deleted",
          type: "success",
        }))
      : console.log("No data");
  };

  
function DragAndDropList() {

  const onDragEnd = (result: DragUpdate) => {
    if(!result.destination){
      return;
    }
    const newItems = Array.from(todoLists);
    console.log(result)
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setTodoLists(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoLists.map((item, index) => (
              <Draggable key={item} draggableId={index.toString()} index={index}>
                {(provided, snapshot) => (
                  <Card
                    provided={provided}
                    snapshot={snapshot}
                    item={item}
                    delOnClickFunction={delOnClick}
                    
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

  useEffect(() => {
    if (!!todoLists) {
      window.localStorage.setItem("items", JSON.stringify(todoLists));
    }
  }, [todoLists]);
  return (
    <>
      <ToastContainer />
      <div className="wrap-container">
        <div className="mainContainer">
        <Helmet>
          <title>Todo - Manage your tasks efficiently</title>
        </Helmet>
        <p className="headContainer">Add your tasks</p>
        <form onSubmit={formOnSubmit} className="formbox">
          <input
            onChange={formOnChange}
            type="text"
            value={todoItem}
            name="todoname"
            maxLength={50}
            className="inputBox"
            required
          ></input>
          <input type="submit" className="subbtn"></input>
        </form>
        <p className="listHeadContainer">Todo Lists</p>
        <DragAndDropList />
      </div>
      </div>
      <Link
        to=""
        onClick={() => {
          const w = window.open("https://github.com/shrijan-bh/");
          if (w) {
            w.focus();
          }
        }}
      >
        <p className="copyright">
          Copyright © All Rights Reserved - Shrijan Bhandari
        </p>
      </Link>
    </>
  );
};

export default Home;
