import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { updateExams, confirmExams, getExamsPeriod } from "../api/ExamsApi";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { getAllClassrooms } from "../api/ClassroomApi";
import { getAllGroups } from "../api/GroupApi";
import { getSubjects } from "../api/SubjectsApi";
import {
  EXAMS_ADD_FIELD_TYPES,
  EXAMS_ADD_MODAL_FORM_KEYS,
  EXAMS_ADD_MODAL_SELECT_KEYS,
  EXAMS_ADD_MODAL_INITIAL_ERRORS,
  EXAMS_ADD_FIELD_VALIDATION_MESSAGES,
} from "../constants/ExamsAddModalConstants";

const ExamsEditModal = ({ event, open, onClose, onSave }) => {
  const [form, setForm] = useState({
    classroom: "",
    group: "",
    materie: "",
    description: "",
    duration: "",
    startTime: "",
    date: "",
  });

  const [errors, setErrors] = useState(EXAMS_ADD_MODAL_INITIAL_ERRORS);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [title, setTitle] = useState("");
  const [examsPeriod, setExamsPeriod] = useState([]);

  let user = useSelector((state) => state.user.user);
  if (!user || !user.token) {
    console.log("User token is null");
    user = { token: null, role: "STUDENT" };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomsData = await getAllClassrooms(user.token);
        setClassrooms(classroomsData);
        const groupsData = await getAllGroups(user.token);
        setGroups(groupsData);
        const subjectsData = await getSubjects(user.token);
        setSubjects(subjectsData);
        const examsPeriodData = await getExamsPeriod(user.token);
        setExamsPeriod(examsPeriodData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user.token, user.role]);

  useEffect(() => {
    if (event) {
      setForm(event);
    }
  }, [event]);

  useEffect(() => {
    let title = "";

    if (form.group) {
      title += form.group;
    }

    if (form.materie) {
      const materie = subjects.find((materie) => materie.name === form.materie);
      if (materie) {
        title += title ? ` - ${materie.name}` : materie.name;
        if (materie.teacher) {
          title += ` - ${materie.teacher}`;
        }
      }
    }

    setTitle(title);
  }, [form.group, form.materie, subjects]);

  const handleChange = (key, value) => {
    let error = "";
    if (key === "startTime") {
      const startTime = parseInt(value, 10);
      const duration = parseInt(form.duration, 10);
      if (startTime < 8 || startTime > 20 - duration) {
        error = `Start time must be between 8 and ${20 - duration}`;
      }
    } else if (key === "date") {
      const examDate = new Date(value);
      const startDate = new Date(examsPeriod.startDate);
      const endDate = new Date(examsPeriod.endDate);
      if (examDate < startDate || examDate > endDate) {
        error = `Date must be between ${examsPeriod.startDate} and ${examsPeriod.endDate}`;
      }
    } else if (key === "duration") {
      const duration = parseInt(value, 10);
      if (duration < 1 || duration > 8) {
        error = `Duration must be between 1 and 8`;
      }
    }

    setForm((prevForm) => ({ ...prevForm, [key]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: value ? error : EXAMS_ADD_FIELD_VALIDATION_MESSAGES.required(key),
    }));
  };

  const validateFormData = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (form[key].trim() === "") {
        newErrors[key] = EXAMS_ADD_FIELD_VALIDATION_MESSAGES.required(key);
      } else if (key === "description" && form[key].trim().length < 10) {
        newErrors[key] = EXAMS_ADD_FIELD_VALIDATION_MESSAGES.descriptionLength;
      } else if (key === "startTime") {
        const startTime = parseInt(form.startTime, 10);
        const duration = parseInt(form.duration, 10);
        if (startTime < 8 || startTime > 20 - duration) {
          newErrors[key] = `Start time must be between 8 and ${20 - duration}`;
        }
      } else if (key === "date") {
        const examDate = new Date(form.date);
        const startDate = new Date(examsPeriod.startDate);
        const endDate = new Date(examsPeriod.endDate);
        if (examDate < startDate || examDate > endDate) {
          newErrors[
            key
          ] = `Date must be between ${examsPeriod.startDate} and ${examsPeriod.endDate}`;
        }
      } else if (key === "duration") {
        const duration = parseInt(form.duration, 10);
        if (duration < 1 || duration > 8) {
          newErrors[key] = `Duration must be between 1 and 8`;
        }
      }
    });
    setErrors(newErrors);
    return newErrors;
  };

  const handleSave = async () => {
    const errors = validateFormData();
    if (Object.values(errors).every((err) => err === "")) {
      setIsLoading(true);
      try {
        const formattedForm = {
          ...form,
          title: title,
          oldGroupName: event.group,
          oldSubjectName: event.materie,
          date: format(new Date(form.date), "HH:mm dd-MM-yyyy"),
          startTime: format(new Date(`1970-01-01T${form.startTime}`), "HH:mm"),
        };
        await updateExams(formattedForm, user.token);
        onSave(form);
        onClose();
      } catch (error) {
        setApiError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const formattedForm = {
        ...form,
        name: event.title,
        date: format(new Date(form.date), "HH:mm dd-MM-yyyy"),
        startTime: format(new Date(`1970-01-01T${form.startTime}`), "HH:mm"),
      };
      await confirmExams(formattedForm, user.token);
      onSave(form);
      onClose();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Exam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Form.Group controlId="examTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} readOnly plaintext />
          </Form.Group>
          {EXAMS_ADD_MODAL_FORM_KEYS.map((key) => (
            <Form.Group controlId={`exam${key}`} key={key}>
              <Form.Label>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Form.Label>
              {EXAMS_ADD_MODAL_SELECT_KEYS.includes(key) ? (
                <Form.Select
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  isInvalid={!!errors[key]}
                >
                  <option value="">Select {key}</option>
                  {key === "classroom" &&
                    classrooms.map((classroom) => (
                      <option key={classroom.id} value={classroom.id}>
                        {classroom.name}
                      </option>
                    ))}
                  {key === "group" &&
                    groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  {key === "materie" &&
                    subjects.map((materie) => (
                      <option key={materie.id} value={materie.id}>
                        {materie.name}
                      </option>
                    ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={EXAMS_ADD_FIELD_TYPES[key]}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  isInvalid={!!errors[key]}
                />
              )}
              <Form.Control.Feedback type="invalid">
                {errors[key]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
        </Form>
        {apiError && <p style={{ color: "red" }}>{apiError}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={isLoading}
          style={{ marginRight: "10px" }}
        >
          Confirm
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={isLoading}
          style={{ marginRight: "10px" }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={isLoading}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ExamsEditModal.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    classroom: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    materie: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ExamsEditModal;
