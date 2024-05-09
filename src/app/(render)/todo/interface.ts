export interface CategoryItem {
    toDoCategoryName: string;
    toDoCategoryId: string;
  }

  export interface TodoItem {
    toDoCategoryId: string;
    toDoId: string;
    toDoDescription:string;
    toDoStatus:number
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

