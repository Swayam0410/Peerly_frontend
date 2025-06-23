import { useEffect, useState } from "react"

const useDebounce=(value)=>{
    const [debounce,setDebounce]=useState(value);
    useEffect(()=>{
       const   timerId= setTimeout(()=>setDebounce(value),350);
       return ()=>clearTimeout(timerId)
    },[value]);
    return debounce;
}
export default useDebounce;