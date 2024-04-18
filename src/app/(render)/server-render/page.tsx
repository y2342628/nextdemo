
async function getData(){
    const res=await fetch("https://juw9ijeqpj.execute-api.ap-southeast-1.amazonaws.com/test",{next:{revalidate:3600}});
    console.log(res)
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json()
}


export default async function Page() {
    const data = await getData()
   
    return <main>
        <div>该页面是服务端渲染页面</div>
        <div>这是接口请求回来的数据：  {JSON.stringify(data)}</div>
      
    </main>
  }