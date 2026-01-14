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

// getUser(), getOrders(userId), getProducts(orderIds).

// const executeSequentially = async () => {
//   try {
//     const user = await getUser();
//     const orders = await getOrders(user.id);
//     const products = await getProducts(orders.map((order) => order.id));
//     return { user, orders, products };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// const executeOrderAndProductInParellel = async () => {
//   try {
//     const user = await getUser();
//     const orders = await getOrders(user.id);
//     const products = await Promise.all(
//       orders.map((order) => getProducts(order.id))
//     );
//     return { user, orders, products: products.flat() };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }

// const groupProductsByCategory = (
//   products: { name: string; category: String }[]
// ) => {
//   const groupedProducts: {
//     category: string;
//     products: { name: string }[];
//   }[] = [];

//   products.forEach((product) => {
//     const existingCategory = groupedProducts.find(
//       (group) => group.category === product.category
//     );

//     if (existingCategory) {
//       existingCategory.products.push({ name: product.name });
//     } else {
//       groupedProducts.push({
//         category: product.category,
//         products: [{ name: product.name }],
//       });
//     }
//   });
//   return groupedProducts;
// };

// const CounterComponent = () => {

//   const defaultCount = 0;

//   const [count, setCount] = useState(defaultCount);

//   const incrementCount = () => setCount((prevState) => prevState + 1);

//   const decreaseCountToZero = () =>
//     setCount((prevState) => (prevState > 1 ? prevState - 1 : prevState));

//   const resetCount = () => setCount(defaultCount);

//   return (
//     <div>
//       <h2>Counter: {count}</h2>
//       <button onClick={incrementCount}>Increment</button>
//       <button onClick={decreaseCountToZero}>Decrement</button>
//       <button onClick={resetCount}>Reset</button>
//     </div>
//   );
// };

// const findFirstNonRepeatingCharacter = (str: string): string | null => {
//   const charCount: { [key: string]: number } = {};
//   for (const char of str) {
//     charCount[char] = (charCount[char] || 0) + 1;
//   }
//   for (const char of str) {
//     if (charCount[char] === 1) {
//       return char;
//     }
//   }
//   return null;
// }

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
// }

type userType = {
  id: number;
  name: string;
  age: number;
};

const users: userType[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 25 },
  { id: 4, name: "David", age: 30 },
];

// const groupUserByAge = (users: userType[]) => {
//   const groupedUsers: { [key: number]: userType[] } = {};

//   users.forEach((user) => {
//     if (!groupedUsers[user.age]) {
//       groupedUsers[user.age] = [];
//     }
//     groupedUsers[user.age].push(user);
//   });

//   const sortedGroupedUsers = Object.keys(groupedUsers)
//     .sort((a, b) => Number(a) - Number(b))
//     .reduce((acc: { [key: number]: userType[] }, key) => {
//       acc[Number(key)] = groupedUsers[Number(key)];
//       return acc;
//     }, {});

//   const usersOver18 = users.filter((user) => user.age > 18);

//   return {
//     sortedGroupedUsers: sortedGroupedUsers,
//     groupedUsers: groupedUsers,
//     usersOver18: usersOver18,
//   };
// };

// type accType = { [key: number]: userType[] };

// const groupFunction = (users: userType[]) => {
//   const groupByAge = users?.reduce((acc: accType, user: userType) => {
//     acc[user.age] = acc[user.age] ?? [];
//     acc[user.age].push(user);
//     return acc;
//   }, {});

//   const sortedGroupedUsers = [...new Set(users.sort((a, b) => a.age - b.age))]; // Get unique ages

//   const usersOver18 = users.filter((user) => user.age > 18);

//   return { groupByAge, sortedGroupedUsers, countOver18: usersOver18.length };
// };

// const TabContext = createContext({
//   activeTab: "",
//   setActiveTab: (tab: string) => {},
// });

// const Tabs = ({ children }: { children: React.ReactNode }) => {
//   const [activeTab, setActiveTab] = useState<string>("");
//   return (
//     <TabContext.Provider
//       value={{ activeTab: "", setActiveTab: (tab: string) => {} }}
//     >
//       {children}
//     </TabContext.Provider>
//   );
// };

// const Tab = () => {
//   const [active, setActiveTab] = useContext(TabContext);
//   return <div>Tab Component</div>;
// };

// const useLocalStorage = <T,>(key: string, initialValue: T) => {
//   const windowIsUndefined = typeof window === "undefined";

//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (windowIsUndefined) return initialValue;
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? (JSON.parse(item) as T) : initialValue;
//     } catch (error) {
//       console.error("Error reading localStorage key “" + key + "”:", error);
//       return initialValue;
//     }
//   });

//   const handleSetValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       console.error("Error setting localStorage key “" + key + "”:", error);
//     }
//   };

//   useEEfect(()=>{
//     const handleStorageChange = (event: StorageEvent) => {
//       if (event.key === key) {
//         try {
//           const newValue = event.newValue ? JSON.parse(event.newValue) : initialValue;
//           setStoredValue(newValue);
//         } catch (error) {
//           console.error("Error parsing localStorage key “" + key + "” on storage event:", error);
//         }
//       };
//     window.addEventListener("storage", handleStorageChange);
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }
//   },[key, initialValue]);

//   return [storedValue, handleSetValue] as const;
// };

// const selectTheLargetFromTheList =()=>