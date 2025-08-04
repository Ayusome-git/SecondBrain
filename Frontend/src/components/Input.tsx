


export function Input({ref,placeholder,variant,type}:{placeholder:string,ref:any,variant?:any,type?:string}){
    return <div>
        <input ref={ref} placeholder={placeholder} type={type==="pass"?"password":"text"} className={`px-2 py-2 border-2 border-gray-400 border-solid rounded m-2 ${variant==="login"?" w-72":"w-48"}`}>
        </input>
    </div>
}