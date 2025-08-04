
type Variants= "primary" | "secondary" | "logout"
interface ButtonProps{
    variant: Variants
    text: string
    startIcon?: any
    onClick?: ()=> void
    fullwidth?: boolean
    loading?:boolean
}

const variantStyles={
    "primary":"bg-purple-300 text-purple-600",
    "secondary":"bg-purple-600 text-white",
    "logout": "bg-red-500 text-white "   
}

const defaultStyle="rounded-md px-4 py-2 flex items-center font-light text-center"

export const Button = (props: ButtonProps)=>{
     
    return <button onClick={props.onClick} className={`${variantStyles[props.variant]} ${defaultStyle} ${props.fullwidth? "w-40 justify-center":""}
        ${props.loading?"opacity-45":""} ${"hover:opacity-80"}`}
        disabled={props.loading}>
        {props.variant==="logout" && props.text}
        {props.variant==="logout" &&<div className="pl-2">{props.startIcon}</div>} 
        {props.startIcon && props.variant!="logout" &&<div className="pr-2">{props.startIcon}</div>} 
        {props.variant!="logout" && props.text }
        </button>
}