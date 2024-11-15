import React from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, deleteTask, showEditForm, updateTaskStatus }) => {
  const handleStatusChange = (task, status) => {
    updateTaskStatus(task.id, status);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <Card className="mb-3 task-card" key={index}>
          <Card.Body>
            <Row>
              <Col md={1} className="d-flex align-items-center">
                <div className={`progress-circle ${task.status.toLowerCase()}`}></div>
              </Col>
              <Col md={3}>
                <strong>Task:</strong> {task.name}
              </Col>
              <Col md={3}>
                <strong>Priority:</strong>
                <span className={`todo-priority-${task.priority.toLowerCase()}`}> {task.priority}</span>
              </Col>
              <Col md={3}>
                <strong>Status:</strong>
                <Form.Check
                  type="radio"
                  label="To Do"
                  name={`status-${index}`}
                  checked={task.status === 'To Do'}
                  onChange={() => handleStatusChange(task, 'To Do')}
                />
                <Form.Check
                  type="radio"
                  label="In Progress"
                  name={`status-${index}`}
                  checked={task.status === 'In Progress'}
                  onChange={() => handleStatusChange(task, 'In Progress')}
                />
                <Form.Check
                  type="radio"
                  label="Done"
                  name={`status-${index}`}
                  checked={task.status === 'Done'}
                  onChange={() => handleStatusChange(task, 'Done')}
                />
              </Col>
              <Col md={2} className="text-right">
                <Button variant="outline-primary" size="sm" onClick={() => showEditForm(task)}>
                  <FaEdit />
                </Button>{' '}
                <Button variant="outline-danger" size="sm" onClick={() => deleteTask(task)}>
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
