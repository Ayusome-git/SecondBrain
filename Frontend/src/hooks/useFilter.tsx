import { useEffect, useState } from "react";




let f=""
function useFilter(){
    const[filters,setFilter] = useState("");
    // console.log(filters);
    useEffect(() => {
        f=filters
        console.log("Filter changed to:", f);
    }, [filters]);
    return {filters, setFilter};
}
export {useFilter,f}