
import { AllIcon } from "./icons/AllIcon";
import { Brain } from "./icons/Brain";
import { TextNoteIcon } from "./icons/TextNoteIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { useFilter } from "../hooks/useFilter";

interface SidebarProps{
    refresh:()=>void
}

export function SideBar(props:SidebarProps){
        const {filters, setFilter} = useFilter()
        interface sidebarItemProps{
            text: string
            icon: any
            onclick: ()=>void
            isSelected:boolean
           
        }
    const selected="bg-gray-300 rounded max-w-36 transition-all"
    return <div className="h-screen bg-white border-2 w-56 fixed left-0 top-0 pl-3 ">
        <div className="flex text-2xl pt-6 items-center text-purple-600">
            <div className="pr-2">
                {<Brain/>}
            </div>
            Second Brain
        </div>
        <div className="pt-8 pl-1">
            <SidebarItem   onclick={()=>{setFilter(""); props.refresh()}} isSelected={filters===""} text="All Contents" icon={AllIcon()}/>
            <SidebarItem  onclick={()=>{setFilter("twitter"); props.refresh()}} isSelected={filters==="twitter"} text="Twitter" icon={TwitterIcon()}/>
            <SidebarItem onclick={()=>{setFilter("youtube"); props.refresh()}} isSelected={filters==="youtube"} text="Youtube" icon={YoutubeIcon()}/>
            <SidebarItem onclick={()=>{setFilter("textNote"); props.refresh()}}isSelected={filters==="textNote"} text="Notes" icon={<TextNoteIcon big={true}/>}/>
        </div>
    </div>


function SidebarItem(props:sidebarItemProps){
    return <div onClick={props.onclick} className={`flex text-gray-700 py-2 cursor-pointer ${props.isSelected? selected:""}`}>
        <div className="pr-2"> 
        {props.icon}
        </div>
        <div className="">  
        {props.text}
        </div>
    </div>
}
}



