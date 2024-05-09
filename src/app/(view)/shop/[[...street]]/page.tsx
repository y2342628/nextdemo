export default function Page({params}:{params:{street:string}}){
    return (
        <div>This is a dynamic route that matches the main route, with parameters：{JSON.stringify(params)}</div>
    )
}