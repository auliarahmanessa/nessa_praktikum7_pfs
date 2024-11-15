import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  const handleShowDeleteConfirm = (task) => {
    setTaskToDelete(task);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setShowDeleteConfirm(false);
      setShowDeleteSuccess(true);
    }
  };

  const handleCloseDeleteSuccess = () => {
    setShowDeleteSuccess(false);
  };

  return (
    <div className="app-container">

     {/* Video Background */}
     <video autoPlay loop muted id="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container className="my-5">
        <h1 className="mb-4">Task List</h1>
        <Button className="add-task-btn" onClick={handleShowForm}>+ Add Task</Button>
        <div className="mt-4">
          <TaskList
            tasks={tasks}
            deleteTask={handleShowDeleteConfirm}
            showEditForm={showEditForm}
            updateTaskStatus={updateTaskStatus}
          />
          <TaskForm
            show={showForm}
            handleClose={handleCloseForm}
            addTask={addTask}
            editTask={editTask}
            taskToEdit={taskToEdit}
          />
        </div>
      </Container>

      {/* Modal Konfirmasi Penghapusan */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Yes, Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Notifikasi Berhasil Dihapus */}
      <Modal show={showDeleteSuccess} onHide={handleCloseDeleteSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>Task Deleted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>The task has been successfully deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseDeleteSuccess}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
