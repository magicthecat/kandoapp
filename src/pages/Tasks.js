import React, { useEffect, useState } from 'react';
import { ApiUtil } from '../utils/apiUtil';
import { Item } from '../components/crudComponents/item';
import { List } from '../components/crudComponents/list';
import { LoadingBar } from '../components/navigationComponents/loadingBarComponent';


export const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to track initial loading
    const [isItemLoading, setIsItemLoading] = useState(false); // State to track list item click loading

    useEffect(() => {
        // Fetch the list of tasks using the utility function
        ApiUtil.fetchData({ endpoint: 'workItems' })
            .then((data) => {
                setTasks(data);
                setIsLoading(false); // Set isLoading to false once the data is fetched
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
                setIsLoading(false); // Set isLoading to false in case of an error
            });

        // Check if the URL contains a task ID (e.g., /tasks/1)
        const taskId = window.location.pathname.split('/tasks/')[1];
        if (taskId) {
            setSelectedTaskId(parseInt(taskId));
        }
    }, []);

    const handleTaskClick = (taskId) => {
        setIsItemLoading(true); // Set isItemLoading to true when a user clicks on a list item
        setSelectedTaskId(taskId);
        // Update the URL to reflect the selected task
        window.history.pushState(null, null, `/tasks/${taskId}`);
        setIsItemLoading(false); // Set isItemLoading to false after handling the list item click
    };

    if (isLoading) {
        return <LoadingBar />;
    }

    if (selectedTaskId) {
        // Render the single task component if a task is selected
        const selectedTask = tasks.find((task) => task.id === selectedTaskId);
        if (!selectedTask) {
            return <div>Loading...</div>;
        }

        return (
            <>
                <h1>{selectedTask.name}</h1>
                <p>{selectedTask.description}</p>
            </>
        );
    }

    return (
        <List>
            {tasks.map((task) => (
                <Item
                    excludeProperties={['id', 'epicId']}
                    item={task}
                    itemHandleClick={() => handleTaskClick(task.id)}
                />
            ))}
        </List>
    );
};