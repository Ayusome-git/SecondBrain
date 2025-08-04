import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useFilter } from "./useFilter";
import {f} from "./useFilter"

export interface CardProps{
    title:string
    link: string
    type: "twitter"| "youtube" | "textNote"
    _id: string
}

export function useContent(){
    const [contents,setContent]=useState<CardProps[]>([]);
    // const {f} = useFilter();

    async function refresh() {
        await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then((response) => {
                let t=response.data.content.filter((con:any)=>{return con.type==f})
                setContent(f===""?response.data.content:t);
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
            });

    }
    // useEffect(() => {
    //     refresh();
    // }, [filters]);
    return {contents, refresh};
}