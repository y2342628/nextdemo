export default function Page({params}:{params:{street:string}}){
    return (
        <div>这是匹配主路由的动态路由，参数：{JSON.stringify(params)}</div>
    )
}