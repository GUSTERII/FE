import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { createExams, getExamsPeriod } from "../api/ExamsApi";
import { getAllClassrooms } from "../api/ClassroomApi";
import { getAllGroups } from "../api/GroupApi";
import { getSubjects } from "../api/SubjectsApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ExamsAddModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    sala: "",
    subGrupa: "",
    materie: "",
    title: "",
    description: "",
    duration: "",
    startTime: "",
    date: "",
  });
  const [errors, setErrors] = useState({});
  const [classrooms, setClassrooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examsPeriod, setExamsPeriod] = useState({ startDate: "", endDate: "" });

  const user = useSelector((state) => state.user.user) || { token: null };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomsData = await getAllClassrooms(user.token);
        const groupsData = await getAllGroups(user.token);
        const subjectsData = await getSubjects(user.token);
        const examsPeriodData = await getExamsPeriod(user.token);

        setClassrooms(classroomsData);
        setGroups(groupsData);
        setSubjects(subjectsData);
        setExamsPeriod(examsPeriodData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching required data.");
      }
    };
    fetchData();
  }, [user.token]);

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: value ? "" : "This field is required" });
  };

  const validateFormData = () => {
    const newErrors = {};
    if (!form.sala) newErrors.sala = "Classroom is required.";
    if (!form.subGrupa) newErrors.subGrupa = "Group is required.";
    if (!form.materie) newErrors.materie = "Subject is required.";
    if (!form.title) newErrors.title = "Title is required.";
    if (!form.description || form.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }
    if (!form.duration || form.duration < 1 || form.duration > 8) {
      newErrors.duration = "Duration must be between 1 and 8 hours.";
    }
    if (!form.startTime) newErrors.startTime = "Start time is required.";
    if (!form.date) {
      newErrors.date = "Date is required.";
    } else {
      const examDate = new Date(form.date);
      const startDate = new Date(examsPeriod.startDate);
      const endDate = new Date(examsPeriod.endDate);
      if (examDate < startDate || examDate > endDate) {
        newErrors.date = `Date must be between ${examsPeriod.startDate} and ${examsPeriod.endDate}.`;
      }
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await createExams(form, user.token);
        toast.success("Exam created successfully.");
        onSave();
        onClose();
      } catch (error) {
        console.error("Error creating exam:", error);
        toast.error("Failed to create exam.");
      }
    }
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Exam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="examClassroom">
            <Form.Label>Classroom</Form.Label>
            <Form.Select
              value={form.sala}
              onChange={(e) => handleFieldChange("sala", e.target.value)}
              isInvalid={!!errors.sala}
            >
              <option value="">Select Classroom</option>
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.name}>
                  {classroom.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.sala}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examGroup">
            <Form.Label>Group</Form.Label>
            <Form.Select
              value={form.subGrupa}
              onChange={(e) => handleFieldChange("subGrupa", e.target.value)}
              isInvalid={!!errors.subGrupa}
            >
              <option value="">Select Group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.groupName}>
                  {group.groupName}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.subGrupa}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              value={form.materie}
              onChange={(e) => handleFieldChange("materie", e.target.value)}
              isInvalid={!!errors.materie}
            >
              <option value="">Select Subject</option>
              {subjects.map((materie) => (
                <option key={materie.id} value={materie.name}>
                  {materie.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.materie}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={form.title}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examDuration">
            <Form.Label>Duration (hours)</Form.Label>
            <Form.Control
              type="number"
              value={form.duration}
              onChange={(e) => handleFieldChange("duration", e.target.value)}
              isInvalid={!!errors.duration}
            />
            <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examStartTime">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={form.startTime}
              onChange={(e) => handleFieldChange("startTime", e.target.value)}
              isInvalid={!!errors.startTime}
            />
            <Form.Control.Feedback type="invalid">{errors.startTime}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="examDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={form.date}
              onChange={(e) => handleFieldChange("date", e.target.value)}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ExamsAddModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ExamsAddModal;
