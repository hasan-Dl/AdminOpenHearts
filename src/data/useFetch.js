import { useState,useEffect } from "react";

export default function useFetch(url) {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError ]=useState(null);
 useEffect(()=>{
    const fetchData =async()=>{
        try {
            const repose = await fetch (url);
            const style = await repose.json();
            setData(style);
        } catch (error) {
          setError(error)
        } finally {
            setLoading(false)
        }       
    };
    fetchData()
 },[url])
  return {data,loading,error}
}


// npm run dev -- --host 127.0.0.1 --port 5501