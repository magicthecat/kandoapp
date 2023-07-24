import Schema from "../classes/schema";
import postStyles from "../styles/Posts.module.css";
import todoStyles from "../styles/Todos.module.css";

const projectSchema = new Schema({

    description: {
        title: "Projects",
        singular: "Project",
    },
    resource: 'projects',
    path: '/projects',
    styles: postStyles, // You may want to create separate styles for each schema
    fields: {
        name: { type: 'text', required: true, value: '' },
        description: { type: 'textarea', required: true, value: '' },
        priority: {
            type: 'select',
            required: true,
            value: '',
            options: ['High', 'Medium', 'Low'].map(priority => ({ value: priority, label: priority })),
        },

    },
    children: ['epics']
});

const epicSchema = new Schema({
    description: {
        title: "Epics",
        singular: "Epic",
    },
    resource: 'epics',
    path: '/epics',
    styles: todoStyles,
    fields: {
        name: { type: 'text', required: true, value: '' },
        description: { type: 'textarea', required: true, value: '' },
        projectId: { type: 'select', required: true, value: '', options: [], isDynamicSelect: true },
        priority: {
            type: 'select',
            required: true,
            value: '',
            options: ['High', 'Medium', 'Low'].map(priority => ({ value: priority, label: priority })),
        },
    },
    parent: {
        schema: projectSchema,
        idField: 'projectId',
    },
    children: ['tasks', 'bugs', 'userstories'],
    dynamicallyDisplayChildren: true,
});


const taskSchema = new Schema({
    description: {
        title: "Tasks",
        singular: "Task",
    },
    resource: 'tasks',
    path: '/tasks',
    styles: todoStyles,
    fields: {
        task: { type: 'text', required: true, value: '' },
        dueDate: { type: 'date', required: false, value: '' },
        priority: {
            type: 'select',
            required: true,
            value: '',
            options: ['High', 'Medium', 'Low'].map(priority => ({ value: priority, label: priority })),
        },
        epicId: { type: 'select', required: true, value: '', options: [], isDynamicSelect: true },
    },
    parent: {
        schema: epicSchema,
        idField: 'epicId',
    }
});


const userStorySchema = new Schema({
    description: {
        title: "User Stories",
        singular: "User Story",
    },
    resource: 'userstories',
    path: '/userstories',
    styles: todoStyles,
    fields: {
        story: { type: 'text', required: true, value: '' },
        dueDate: { type: 'date', required: false, value: '' },
        priority: {
            type: 'select',
            required: true,
            value: '',
            options: ['High', 'Medium', 'Low'].map(priority => ({ value: priority, label: priority })),
        },
        epicId: { type: 'select', required: true, value: '', options: [], isDynamicSelect: true },
    },
    parent: {
        schema: epicSchema,
        idField: 'epicId',
    }
});

const bugSchema = new Schema({
    description: {
        title: "Bugs",
        singular: "Bug",
    },
    resource: 'bugs',
    path: '/bugs',
    styles: todoStyles,
    fields: {
        bug: { type: 'text', required: true, value: '' },
        dueDate: { type: 'date', required: false, value: '' },
        priority: {
            type: 'select',
            required: true,
            value: '',
            options: ['High', 'Medium', 'Low'].map(priority => ({ value: priority, label: priority })),
        },
        epicId: { type: 'select', required: true, value: '', options: [], isDynamicSelect: true },
    },
    parent: {
        schema: epicSchema,
        idField: 'epicId',
    }
});

export const kanbanSchemas = [projectSchema, epicSchema, taskSchema, userStorySchema, bugSchema];