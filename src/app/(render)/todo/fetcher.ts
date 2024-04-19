import { CategoryItem, TodoItem,UpdateItem } from "./interface";

import browserRequest from "@/utils/browserRequest";

export async function categoryFetcher(): Promise<CategoryItem[]> {
  const res: any = await browserRequest({
    url: "/todo/api/category",
    method: "get",
  });

  return res.data.data;
}

export async function getTodoFetcher(): Promise<TodoItem[]> {
  const res: any = await browserRequest({
    url: "/todo/api/getTodo",
    method: "get",
  });

  return res.data.data;
}


export async function addTodo(data: {
  toDoDescription: string;
  toDoCategoryId: string;
}) {
  const res: any = await browserRequest({
    url: "/todo/api/addTodo",
    method: "POST",
    data,
  });

  return res.data.data;
}

export async function deleteTodo(  toDoId: string) {
    const res: any = await browserRequest({
      url: `/todo/api/deleteTodo?toDoId=${toDoId}`,
      method: "GET"
    });
  
    return res.data.data;
  }
  

  
export async function doneTodo(  toDoId: string) {
  const res: any = await browserRequest({
    url: `/todo/api/doneTodo?toDoId=${toDoId}`,
    method: "GET"
  });

  return res.data.data;
}

export async function updateTodo(data:UpdateItem) {
  const res: any = await browserRequest({
    url: "/todo/api/updateTodo",
    method: "POST",
    data,
  });

  return res.data.data;
}