import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const ExamsViewDetailsModal = ({ event, open, onClose, onEdit }) => {
  const [form, setForm] = useState({
    classroom: "",
    group: "",
    materie: "",
    title: "",
    description: "",
    duration: "",
    startTime: "",
    date: "",
  });

  let user = useSelector((state) => state.user.user);
  if (!user || !user.token) {
    console.log("User token is null");
    user = { token: null, role: "STUDENT" };
  }

  useEffect(() => {
    if (event) {
      setForm(event);
    }
  }, [event]);

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Exam Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGridClassroom">
            <Form.Label>Classroom</Form.Label>
            <Form.Control
              type="text"
              name="classroom"
              value={form.classroom}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formGridGroup">
            <Form.Label>Group</Form.Label>
            <Form.Control
              type="text"
              name="group"
              value={form.group}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formGridmaterie">
            <Form.Label>materie</Form.Label>
            <Form.Control
              type="text"
              name="materie"
              value={form.materie}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formGridName">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={form.title} disabled />
          </Form.Group>
          <Form.Group controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={form.description}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formGridDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={form.duration}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control type="text" name="date" value={form.date} disabled />
          </Form.Group>
          <Form.Group controlId="formGridStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="text"
              name="startTime"
              value={form.startTime}
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {user.role !== "STUDENT" && (
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "10px" }}
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
        <Button
          color="secondary"
          variant="contained"
          onClick={onClose}
          style={{ marginRight: "10px" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ExamsViewDetailsModal.propTypes = {
  event: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ExamsViewDetailsModal;
