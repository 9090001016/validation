import React, { useState } from "react";
import NavBar from "./NavBar";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const ValidateForm = () => {
  const [list, setList] = useState([]);
  const [showData, setShowData] = useState(true);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("required")
      .min(3, "Minimum 3 Character")
      .matches(/[A-Za-z]/, "Only Characters are allowed"),
    email: Yup.string().email("Enter a valid Email").required("required"),
    mobile : Yup.string()
      .required("required")
      .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number")
      .min(10, "Minimum 10 Digits")
      .max(10, "Must be 10 Digits"),
    project: Yup.string()
      .required("required")
      .min(3, "Minimum 3 Character")
      .max(20, "Must be 20 characters or less"),
    task: Yup.string()
      .required("required")
      .min(3, "Minimum 3 Character")
      .max(20, "Must be 20 characters or less"),
    startDate: Yup.string().required("required"),
    endDate: Yup.string().required("required"),
    taskStatus: Yup.string().required("A radio option is required"),
  });
  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    project: "",
    task: "",
    startDate: "",
    endDate: "",
    taskStatus: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setList([...list, values]);
      resetForm({ values: "" });
    },
  });

//   console.log(list);
  //show and hide table
  const changeViewHandler = (e) => {
    e.preventDefault();
    setShowData(!showData);
  };

  // edit a particular row data
  const editHandler = (mobile) => {
    console.log(mobile);
    // if (mobile) {
      let itemEdited = list.find((x) => x.mobile === mobile);
      console.log(itemEdited.name);
      initialValues.name = itemEdited.name
      console.log(initialValues.name)
      
    // }
  };
      
   

  // delete a particular row data
  const deleteHandler = (mobile) => {
    if (mobile) {
      let newData = list.filter((x) => x.mobile !== mobile);
      setList(newData);
    }
  };
  return (
    <Container className="p-2">
      <NavBar />
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="mobile">Mobile Number</Form.Label>
              <Form.Control
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Enter Mobile Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <div className="text-danger">{formik.errors.mobile}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="project">Project Name</Form.Label>
              <Form.Control
                type="text"
                id="project"
                name="project"
                placeholder="Enter Project Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.project}
              />
              {formik.touched.project && formik.errors.project ? (
                <div className="text-danger">{formik.errors.project}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="task">Task</Form.Label>
              <Form.Control
                type="text"
                name="task"
                id="task"
                placeholder="Enter Task"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.task}
              />
              {formik.touched.task && formik.errors.task ? (
                <div className="text-danger">{formik.errors.task}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="startDate">Start Date</Form.Label>
              <Form.Control
                type="date"
                id="startDate"
                name="startDate"
                placeholder="Start Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <div className="text-danger">{formik.errors.startDate}</div>
              ) : null}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="endDate">End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                id="endDate"
                placeholder="Target  Date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <div className="text-danger">{formik.errors.endDate}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="taskStatus">Plan Status</Form.Label>
            <Form.Check
              label="Planned"
              name="taskStatus"
              type="radio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="Planned"
            />
            <Form.Check
              label="InProgress"
              name="taskStatus"
              type="radio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="InProgress"
            />
            <Form.Check
              label="Done"
              name="taskStatus"
              type="radio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="Done"
            />
          </Form.Group>
          {formik.touched.taskStatus && formik.errors.taskStatus ? (
            <div className="text-danger">{formik.errors.taskStatus}</div>
          ) : null}
        </Row>
        <Row >
          <Col className="p-3">
            <Button variant="success" type="submit" >
              Save
            </Button>&nbsp;

            <Button variant="warning" onClick={changeViewHandler} >
              View
            </Button>
          </Col>
        </Row>
      </Form>

      {showData && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Project</th>
              <th>Task</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {list.length > 0 &&
              list.map((element, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.project}</td>
                  <td>{element.project}</td>
                  <td>{element.taskStatus}</td>
                  <td>{element.startDate}</td>
                  <td>{element.endDate}</td>
                  <td>
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={(e) => editHandler(element.mobile)}
                    />
                  </td>
                  <td>
                    <i
                      className="fas fa-trash"
                      aria-hidden="true"
                      onClick={(e) => deleteHandler(element.mobile)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ValidateForm;

