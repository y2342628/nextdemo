'use client';

import { useState,useCallback } from 'react'
import useSWRMutation from 'swr/mutation'
import browserRequest from '@/utils/browserRequest';


async function fetcher (){
    const res:any=await browserRequest({url:"/api/test",method:"get"});

    return res.data

}

 
export default function Counter() {
  const [show, setShow] = useState(false)

  const { data, error, trigger} = useSWRMutation('/api/test', fetcher);

 
 
  if (error) return <div>failed to load</div>
 
  // render data
 
  return (
    <div>
    这是客户端渲染的页面
    <div>这是客户端从接口获取的数据：{show && data ?<span>{data}</span>:null}</div>
      <button className='btn-primary' onClick={() => {
        trigger();
        setShow(true)
      }}>Click me</button>
    </div>
  )
}