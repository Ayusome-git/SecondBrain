import axios from "axios";
import { DeleteIcon } from "./icons/DeleteIcon";
import { BACKEND_URL } from "../config";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { OpenIcon } from "./icons/OpenIcon";
import { TextNoteIcon } from "./icons/TextNoteIcon";
import { Tweet } from "react-tweet";



interface CardProps{
    title:string
    link: string
    type: "twitter"| "youtube" | "textNote"
    _id: string
    refresh: ()=>void
}

export function Card(props:CardProps){
    return <div>
        <div className="p-3 bg-white rounded-md border max-w-[310px] min-w-64 ">
            <div className="flex justify-between items-center border border-slate-300 rounded p-2">
                <div className="flex items-center text-sm">
                    <div className="pr-2 text-gray-500">
                        {props.type==="twitter" && <TwitterIcon />}
                        {props.type==="youtube" && <YoutubeIcon />}
                        {props.type==="textNote" && <TextNoteIcon big={false} />}
                    </div>
                    <div className={`${" max-w-64 text-md overflow-hidden break-words "}`}>{props.title}</div>
                    
                </div>
                <div className="flex items-center ">
                    {!(props.type==="textNote") && <div className="pr-3 text-gray-500">
                        <a href={props.link} target="_blank">
                        <OpenIcon/>
                        </a>
                    </div>}
                <div className= "text-gray-500 cursor-pointer" onClick={()=>deleteContent(props._id)}>
                    <DeleteIcon />
                </div> 
            </div>
        </div> 
        <div className={props.type==="twitter"?"":"pt-4"}>
            {props.type==="youtube" && <iframe className="w-full max-h-72 border rounded" width="560" height="315" 
            src={props.link.replace("watch","embed").replace("?v=","/")} title="YouTube video player"
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen></iframe>}
            {props.type==="twitter" && (() => {
                const match = props.link.match(/(\d+)(?!.*\d)/);
                return match ? <div className="light "><Tweet id={`${match[0]}`} /></div> : null;
            })()}
            {props.type==="textNote" &&  <div className="overflow-hidden text-ellipsis whitespace-pre-wrap break-words">
                <div className="border border-slate-300 pb-2 rounded">
                <div className="p-2">{props.link} </div>
                </div>
            </div>}
           
            </div>
        </div>
    </div>
    
    async function deleteContent(_id:string){
        try{
            await axios.delete(`${BACKEND_URL}/api/v1/content/${_id}`)
            props.refresh()

        }catch(e){
            console.log(e);
        }
    
    }
}