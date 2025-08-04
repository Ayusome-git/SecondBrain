import { useState } from "react";




export function UseModel(){
    const [modelOpen,setModelOpen] = useState(false);

    return {setModelOpen,modelOpen};
}