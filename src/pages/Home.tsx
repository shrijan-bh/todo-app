import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import "../styles/main.css";
import { ToastContainer } from "react-toastify";
import { toastHook } from "../hooks/toastHook";
import { Link } from "react-router-dom";

const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const storageItems = JSON.parse(localStorage.getItem("items") || "[]");
  const [todoLists, setTodoLists] = useState<string[]>(storageItems);
  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(e.target.value);
  };

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoLists.includes(todoItem)) {
      setTodoLists((prev) => [todoItem, ...prev]);
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
  useEffect(() => {
    if (!!todoLists) {
      window.localStorage.setItem("items", JSON.stringify(todoLists));
    }
  }, [todoLists]);
  return (
    <>
      <ToastContainer />

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
        {todoLists.map((item) => (
          <div key={item} className="todoItem">
            <p className="todoName" style={{ display: "inline-block" }}>
              {item}
            </p>
            <button
              type="button"
              className="deleteButton"
              onClick={() => delOnClick(item)}
            >
              ❌
            </button>
          </div>
        ))}
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
