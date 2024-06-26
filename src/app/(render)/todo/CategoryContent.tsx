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
        ?.sort((a, b) => a.toDoStatus - b.toDoStatus)
        .map((i) => ({
          ...i,
          modifyStatus: modifyId === i.toDoId,
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
    setValue("toDoId", todo.toDoId);
    setValue("toDoDescription", todo.toDoDescription);
    setModifyId(todo.toDoId);
  };

  return (
    <>
      <ListGroup>
        {sortTodoByCategory?.map((todo) => (
          <ListGroup.Item className="py-3" key={todo.toDoId} variant={todo.toDoStatus === 0 ? "" : "success"}>
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
                        <Button className="mt-1 ms-1" variant="secondary" onClick={() => setModifyId("")}>
                          cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              ) : (
                <Col>{todo.toDoStatus ? <del>{todo.toDoDescription}</del> : todo.toDoDescription}</Col>
              )}

              {todo.modifyStatus ? null : (
                <Col xs={2} md={2}>
                  <BsPencilSquare title="modify" size={26} className="pointer" color="var(--bs-blue)" onClick={() => showModifyInput(todo)} />
                  <BsTrash title="delete" size={26} className="mx-4 pointer" color="var(--bs-blue)" onClick={() => confirmItem(todo.toDoId)} />
                  {!todo.toDoStatus && <BsCheck2 title="done" size={26} className="pointer" color="var(--bs-blue)" onClick={() => doneItem(todo.toDoId)} />}
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
