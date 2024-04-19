export interface CategoryItem {
    ToDoCategoryName: string;
    ToDoCategoryId: string;
  }

  export interface TodoItem {
    ToDoCategoryId: string;
    ToDoId: string;
    ToDoDescription:string;
    ToDoStatus:number
  }

  export interface CategoryItemWithTodo extends CategoryItem {
    todoByCategory:TodoItem[]
  }


  export interface FormProp {
    toDoCategoryId: string;
    toDoDescription:string;
  }

  export interface UpdateItem {
    toDoId: string;
    toDoDescription:string;
  }

