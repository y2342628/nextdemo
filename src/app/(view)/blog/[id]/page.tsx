
export default function page ({params}:{params:{id:string}}){
   
    return (
        <div>这是个动态路由页面，参数{params.id}</div>
    )
}