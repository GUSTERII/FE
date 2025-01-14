import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamsAddModal from "./ExamsAddModal";
import ExamsEditModal from "./ExamsEditModal";
import ExamsViewDetailsModal from "./ExamsViewDetailsModal";
import { getExamsBySpecialization } from "../api/ExamsApi";
import { getAllSpecializations } from "../api/DegreeApi";
import { getAllFaculties } from "../api/FacultyApi";
import { useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

const ExamCalendar = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [showEditExamModal, setShowEditExamModal] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const user = useSelector((state) => state.user.user) || { token: null, role: "STUDENT" };

  const handleOnSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowViewDetailsModal(true);
  };

  const fetchFacultiesAndDegrees = async () => {
    try {
      const [facultiesData, degreesData] = await Promise.all([
        getAllFaculties(),
        getAllSpecializations(),
      ]);
      setFaculties(facultiesData);
      setDegrees(degreesData);
    } catch (error) {
      toast.error(`Error fetching faculties or degrees: ${error.message}`);
    }
  };

  const fetchExams = async () => {
    if (selectedFaculty && selectedDegree) {
      setLoading(true);
      try {
        const examsData = await getExamsBySpecialization(selectedDegree.label);
        setFilteredExams(examsData);
      } catch (error) {
        toast.error(`Error fetching exams: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFacultiesAndDegrees();
  }, []);

  useEffect(() => {
    fetchExams();
  }, [selectedFaculty, selectedDegree]);

  const events = filteredExams.map((exam, index) => ({
    id: index,
    title: exam.name,
    materie: exam.materie,
    start: moment(exam.date, "HH:mm DD-MM-YYYY").toDate(),
    end: moment(exam.date, "HH:mm DD-MM-YYYY").add(exam.duration, "hours").toDate(),
    desc: exam.description,
    location: exam.classroom,
    group: exam.group,
    status: exam.status,
  }));

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.status === "CONFIRMED" ? "green" : "orange",
    },
  });

  const mapSelectedEventToForm = (event) => {
    if (!event) return null;
    return {
      title: event.title,
      materie: event.materie,
      date: moment(event.start).format("YYYY-MM-DD"),
      startTime: moment(event.start).format("HH:mm"),
      endTime: moment(event.end).format("HH:mm"),
      classroom: event.location,
      duration: (event.end.getTime() - event.start.getTime()) / 3600000,
      description: event.desc,
      group: event.group,
    };
  };

  const handleModalClose = async (closeModalFn) => {
    closeModalFn(false);
    if (selectedDegree) {
      try {
        const examsData = await getExamsBySpecialization(selectedDegree.label);
        setFilteredExams(examsData);
      } catch (error) {
        toast.error(`Error fetching exams: ${error.message}`);
      }
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <ToastContainer />
      <Box display="flex" justifyContent="flex-start" gap="20px">
        <Select
          options={faculties.map(({ id, name }) => ({ value: id, label: name }))}
          isSearchable
          isDisabled={faculties.length === 0}
          value={selectedFaculty || null}
          placeholder="Select Faculty"
          onChange={(option) => setSelectedFaculty(option)}
        />
        <Select
          options={degrees
            .filter((degree) => selectedFaculty?.label === degree.facultateName)
            .map(({ id, name }) => ({ value: id, label: name }))}
          isSearchable
          isDisabled={!selectedFaculty}
          value={selectedDegree || null}
          placeholder="Select Degree"
          onChange={setSelectedDegree}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={user.role === "STUDENT"}
          onClick={() => setShowAddExamModal(true)}
        >
          Add Exam
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="500px">
          <CircularProgress />
        </Box>
      ) : selectedFaculty && selectedDegree ? (
        <Box mt={2}>
          <Calendar
            localizer={localizer}
            events={events.length > 0 ? events : [{
              id: 0,
              title: "No Exams Scheduled",
              start: new Date(),
              end: new Date(),
            }]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={['month', 'week', 'day']}
            min={new Date(0, 5, 1, 8, 0)}
            max={new Date(0, 5, 1, 21, 0)}
            onSelectEvent={handleOnSelectEvent}
            eventPropGetter={eventStyleGetter}
          />
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Please select a faculty and specialization.
        </Typography>
      )}
      <ExamsAddModal
        open={showAddExamModal}
        onClose={() => handleModalClose(setShowAddExamModal)}
      />
      <ExamsViewDetailsModal
        event={mapSelectedEventToForm(selectedEvent)}
        open={showViewDetailsModal}
        onClose={() => setShowViewDetailsModal(false)}
        onEdit={() => {
          setShowViewDetailsModal(false);
          setShowEditExamModal(true);
        }}
      />
      <ExamsEditModal
        event={mapSelectedEventToForm(selectedEvent)}
        open={showEditExamModal}
        onClose={() => handleModalClose(setShowEditExamModal)}
      />
    </Container>
  );
};

export default ExamCalendar;
