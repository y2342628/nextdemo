import { ListGroup, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { BsCheck2, BsTrash, BsPencilSquare } from "react-icons/bs";
import { TodoItem, FormProp, UpdateItem } from "./interface";
import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function CategoryContent({
  todoByCategory,
  deleteItem,
  doneItem,
  updateItem,
}: {
  todoByCategory?: TodoItem[];
  deleteItem: (todoId: string) => void;
  doneItem: (todoId: string) => void;
  updateItem: (data: UpdateItem) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateItem>();

  const [modalShow, setModalShow] = useState(false);
  const [selectedToDoId, setSelectedToDoId] = useState<string>("");
  const [modifyId, setModifyId] = useState<string>("");

  const sortTodoByCategory = useMemo(
    () =>
      todoByCategory
        ?.sort((a, b) => a.ToDoStatus - b.ToDoStatus)
        .map((i) => ({
          ...i,
          modifyStatus: modifyId === i.ToDoId,
        })),
    [todoByCategory, modifyId]
  );

  if (!todoByCategory || sortTodoByCategory?.length === 0) {
    return <div className="text-center mt-3 fs-3">This category is empty!</div>;
  }

  const confirmItem = (toDoId: string) => {
    setSelectedToDoId(toDoId);
    setModalShow(true);
  };

  const onSubmit = async (data: UpdateItem) => {
    await updateItem(data);
    setModifyId("");
  };

  const showModifyInput = (todo: TodoItem) => {
    setValue("toDoId", todo.ToDoId);
    setValue("toDoDescription", todo.ToDoDescription);
    setModifyId(todo.ToDoId);
  };

  return (
    <>
      <ListGroup>
        {sortTodoByCategory?.map((todo) => (
          <ListGroup.Item
            className="py-3"
            key={todo.ToDoId}
            variant={todo.ToDoStatus === 0 ? "" : "success"}
          >
            <Row>
              {todo.modifyStatus ? (
                <Col>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col>
                        <Form.Control type="hidden" {...register("toDoId")} />
                        <Form.Control
                          isInvalid={!!errors.toDoDescription}
                          size="lg"
                          autoFocus
                          type="text"
                          placeholder="Add something what you want do"
                          {...register("toDoDescription", { required: true })}
                        />
                      </Col>
                      <Col xs={2} md={2}>
                        <Button className="mt-1" type="submit">
                          save
                        </Button>
                        <Button
                          className="mt-1 ms-1"
                          variant="secondary"
                          onClick={() => setModifyId("")}
                        >
                          cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              ) : (
                <Col>
                  {todo.ToDoStatus ? (
                    <del>{todo.ToDoDescription}</del>
                  ) : (
                    todo.ToDoDescription
                  )}
                </Col>
              )}

              {todo.modifyStatus ? null : (
                <Col xs={2} md={2}>
                  <BsPencilSquare
                    size={26}
                    className="pointer"
                    color="var(--bs-blue)"
                    onClick={() => showModifyInput(todo)}
                  />
                  <BsTrash
                    size={26}
                    className="mx-4 pointer"
                    color="var(--bs-blue)"
                    onClick={() => confirmItem(todo.ToDoId)}
                  />
                  {!todo.ToDoStatus && (
                    <BsCheck2
                      size={26}
                      className="pointer"
                      color="var(--bs-blue)"
                      onClick={() => doneItem(todo.ToDoId)}
                    />
                  )}
                </Col>
              )}
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={modalShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure to delete this item?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              deleteItem(selectedToDoId);
              setModalShow(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
