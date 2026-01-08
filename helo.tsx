// import { useEffect, useState } from "react";

import { useState } from "react";

// const debounce = <T extends (...args: any[]) => any[]>(
//   func: any,
//   delay: number
// ): ((...args: Parameters<T>) => void) => {
//   let timeoutId: ReturnType<typeof setTimeout> | null = null;
//   return (...args: Parameters<T>) => {
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

// const useFetch = <T = any,>(url: string) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     setLoading(true);
//     const abortController = new AbortController();
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, {
//           signal: abortController.signal,
//         });

//         if (!response.ok) {
//           throw new Error(" Aborted");
//         }

//         const result = await response?.json();
//         setData(result);
//       } catch (err) {
//         if (err instanceof Error && err.name !== "Abort") {
//           setError(err);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     return () => abortController.abort();
//   }, [url]);
//   return {
//     loading,
//     data,
//     error,
//   };
// };

// const flattenList=(arr:any[])=>{
//   const result:any[] =[];
//   arr.forEach((item)=>{
//     if(Array.isArray(item)){
//       result.push([...item])
//     }else{
//       result.push(item)
//     }
//   })
//   return result;
// }

type itemStatus = "pending" | "completed";

type todoItem = {
  title: string;
  status: "pending" | "completed";
};

const todoListSample: todoItem[] = [
  { title: "Buy groceries", status: "pending" },
  { title: "Walk the dog", status: "completed" },
  { title: "Read a book", status: "pending" },
];

export const TodoApp = () => {
  const [todoList, setTodoList] = useState<todoItem[]>(todoListSample);
  const [filtredList, setFilteredList] = useState<todoItem[]>(todoListSample);

  const addTodo = (todo: todoItem) => {
    setTodoList((prevList) => [...prevList, todo]);
    setFilteredList((prevList) => [...prevList, todo]);
  };

  const removeTodo = (index: number) => {
    setTodoList((prevList) => prevList.filter((_, i) => i !== index));
    setFilteredList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const editTodo = (index: number, newTodo: todoItem) => {
    setTodoList((prevList) =>
      prevList.map((item, i) => (i === index ? newTodo : item))
    );
    setFilteredList((prevList) =>
      prevList.map((item, i) => (i === index ? newTodo : item))
    );
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = event.target.value;

    const activeList = todoList.filter((todo) => todo.status === "pending");
    const completedList = todoList.filter(
      (todo) => todo.status === "completed"
    );

    switch (filterValue) {
      case "all":
        setFilteredList(todoList);
        break;
      case "active":
        setFilteredList(activeList);
        break;
      case "completed":
        setFilteredList(completedList);
        break;
      default:
        setFilteredList(todoList);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <h2>All Todos</h2>
        <div className="flex gap-2">
          FilterBy:
          <select onChange={(e) => handleFilterChange(e)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <ul>
          {filtredList?.map((todo, index) => (
            <li key={index}>
              {todo.title} - {todo.status}
              <button onClick={() => removeTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
