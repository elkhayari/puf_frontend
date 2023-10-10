import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Chip,
  TableBody
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { format } from 'date-fns'; // Import the format function from date-fns
import { Header } from '../../components';
import { BASE_URL } from '../../config';

const useStyles = makeStyles((theme) => ({
  completed: {
    backgroundColor: '#c8e6c9' // Green background for completed tasks
  },
  inProgress: {
    backgroundColor: '#fff' // White background for tasks in progress
  },
  resultButton: {
    marginLeft: theme.spacing(2) // Add some spacing between cells
  },
  tableRow: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1) // Add margin-bottom to all rows except the last one
    }
  }
}));

const Results = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const classes = useStyles();

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/brokerApi/tasks/`);
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Failed to fetch pending tasks:', error);
    }
  };

  useEffect(() => {
    // Fetch tasks initially
    fetchTasks();

    // Set up interval to fetch tasks every 5 seconds
    const intervalId = setInterval(fetchTasks, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleResultButtonClick = (task) => {
    fetch(`${BASE_URL}/brokerApi/evaluation-result/${task.id}/`)
      .then((response) => response.json())
      .then((data) => {
        navigate(`/metrics`, {
          state: { evaluationData: task, evaluationResult: data.metrics }
        });
      })
      .catch((error) => console.log(error)); // Replace 1 with the desired ID
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { background: '#4caf50', color: '#ffffff' }; // Green background, white text
      case 'IN_PROGRESS':
        return { background: '#ffc107', color: '#000000' }; // Yellow background, black text
      case 'FAILED':
        return { background: '#f44336', color: '#ffffff' }; // Red background, white text
      default:
        return { background: '#ffffff', color: '#000000' }; // Default background and text color
    }
  };

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss'); // Format the date and time
  };

  const handleDownload = async (task) => {
    console.log('download', task);
    try {
      // Replace this with your API request
      const response = await fetch(
        `${BASE_URL}/brokerApi/evaluation-result/${task.id}/`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(data)], { type: 'text/json' });
      element.href = URL.createObjectURL(file);
      element.download = `${task.title}.json`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  };

  const handleDelete = async (task) => {
    // Perform your delete operation here
    console.log('Delete clicked');
    try {
      const response = await fetch(
        `${BASE_URL}/brokerApi/delete-result/${task.id}/`,
        {
          method: 'POST'
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Task deleted successfully');
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    }
  };

  return (
    <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
      <Header category="Dashboard" title="Results" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>Finish Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Result</TableCell>
              <TableCell aline="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.task_id} className={classes.tableRow}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{formatDateTime(task.start_time)}</TableCell>
                <TableCell>{formatDateTime(task.finish_time)}</TableCell>
                <TableCell>
                  <Chip
                    label={task.status}
                    style={{
                      background: getStatusChipColor(task.status).background,
                      color: getStatusChipColor(task.status).color
                    }}
                    icon={
                      task.status === 'PENDING' ? (
                        <CircularProgress size={20} />
                      ) : null
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    className={classes.resultButton}
                    variant="outlined"
                    color="primary"
                    disabled={task.status !== 'COMPLETED'}
                    onClick={() => handleResultButtonClick(task)}
                  >
                    View Result
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDownload(task)}
                    color="primary"
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(task)}
                    color="secondary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Results;
