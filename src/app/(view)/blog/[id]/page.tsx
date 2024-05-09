
export default function page ({params}:{params:{id:string}}){
   
    return (
        <div>this is a dynamic route page, the params is: {params.id}</div>
    )
}