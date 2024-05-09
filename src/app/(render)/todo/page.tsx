"use client";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import CategoryTabs from "./CategoryTabs";
import useSwr,{mutate} from "swr";
import Loading from "@/components/Loading";
import { categoryFetcher, getTodoFetcher, addTodo ,deleteTodo,doneTodo, updateTodo} from "./fetcher";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormProp,UpdateItem } from "./interface";
import {  toast } from 'react-toastify';


export default function Page() {
  const {
    data: category,
    error: categoryError,
    isLoading,
  } = useSwr("/api/category", categoryFetcher);
  const { data: todo } = useSwr("/api/todo", getTodoFetcher);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormProp>();

  const onSubmit: SubmitHandler<FormProp> = async (data) => {
    const res = await addTodo(data);
    
    if(!res)return
    toast.success("add success",{
        autoClose:1000
    });
    mutate("/api/todo");
    resetField("toDoDescription")
  };

  
  const deleteItem = async (selectedToDoId:string) => {
    const res = await deleteTodo(selectedToDoId);
    if (!res) return;
    toast.success("delete success",{
        autoClose:1000
    });
    mutate("/api/todo");
  };

  const doneItem = async (selectedToDoId:string) => {
    const res = await doneTodo(selectedToDoId);
    if (!res) return;
    mutate("/api/todo");
  };

  const updateItem =async (data:UpdateItem) => {
    const res = await updateTodo(data);
    if(!res)return
    toast.success("update success",{
        autoClose:1000
    });
    mutate("/api/todo");
  };



  if (isLoading) return <Loading show={true} />;

  return (
    <Container className="py-4">
      <h2 className="text-center">TODO</h2>
      <Form className="px-2 mb-4 " onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col xs={3} md={3} className="d-flex">
          <Form.Select {...register("toDoCategoryId")}>
            {category?.map((i) => (
              <option key={i.toDoCategoryId} value={i.toDoCategoryId}>
                {i.toDoCategoryName}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            isInvalid={!!errors.toDoDescription}
            size="lg"
            type="text"
            placeholder="Add something what you want do"
            {...register("toDoDescription", { required: true })}
          />
        </Col>
        <Col className="d-flex justify-content-end" xs={1} md={1}>
          <Button variant="primary" type="submit">
            ADD
          </Button>
        </Col>
        </Row>
      </Form>
      {categoryError ? (
        <div>failed to load</div>
      ) : (
        <CategoryTabs data={category} todo={todo} deleteItem={deleteItem} doneItem={doneItem} updateItem={updateItem} />
      )}

      
    </Container>
  );
}
