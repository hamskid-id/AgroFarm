// import { useEffect, useState } from "react";

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