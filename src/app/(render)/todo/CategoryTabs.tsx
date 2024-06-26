import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CategoryItem, TodoItem,FormProp,UpdateItem } from "./interface";
import CategoryContent from "./CategoryContent";
import { useMemo } from "react";

function CategoryTabs({
  data,
  todo,
  deleteItem,
  doneItem,
  updateItem
}: {
  data?: CategoryItem[];
  todo?: TodoItem[];
  deleteItem:(todoId:string)=>void;
  doneItem:(todoId:string)=>void;
  updateItem:(data:UpdateItem)=>void;
}) {
  const _data = useMemo(
    () =>
      data?.map((i) => ({
        ...i,
        todoByCategory: todo?.filter(
          (t) => t.toDoCategoryId === i.toDoCategoryId
        ),
      })),
    [data, todo]
  );

  if (!_data) return null;
  return (
    <Tabs
      defaultActiveKey={_data[0]?.toDoCategoryId}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      {_data?.map((i) => (
        <Tab
          key={i.toDoCategoryId}
          eventKey={i.toDoCategoryId}
          title={i.toDoCategoryName}
        >
          <CategoryContent todoByCategory={i.todoByCategory} deleteItem={deleteItem}  doneItem={doneItem} updateItem={updateItem}/>
        </Tab>
      ))}
    </Tabs>
  );
}

export default CategoryTabs;
