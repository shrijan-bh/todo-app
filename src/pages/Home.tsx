import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
const Home = () => {
  const [todoItem, setTodoItem] = useState("");
  const storageItems = JSON.parse(localStorage.getItem("items") || "{}");
  const [todoLists, setTodoLists] = useState<string[]>(storageItems);
  const formOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoItem(e.target.value);
  };

  const formOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoLists((prev) => [todoItem, ...prev]);
    setTodoItem("");
  };

  const delOnClick = (item: string) => {
    const answer = todoLists.includes(item);
    answer
      ? setTodoLists((current) => current.filter((ite) => ite !== item))
      : console.log("No data");
  };
  useEffect(() => {
    if (!!todoLists) {
      window.localStorage.setItem("items", JSON.stringify(todoLists));
    }
  }, [todoLists]);
  return (
    <div>
      <Helmet>
        <title>Your ToDo list</title>
      </Helmet>

      <h1>ToDo App</h1>

      <form onSubmit={formOnSubmit}>
        <input
          onChange={formOnChange}
          type="text"
          value={todoItem}
          name="todoname"
        ></input>
        <input type="submit"></input>
      </form>

      <h2>My ToDo list</h2>
      {todoLists.map((item) => (
        <div key={item}>
          <p style={{ display: "inline-block" }}>{item}</p>
          <button
            type="button"
            onClick={() => delOnClick(item)}
            style={{ display: "inline-block", marginLeft: "2rem" }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
