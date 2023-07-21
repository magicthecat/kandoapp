import { AboutPage } from '../pages/About';
import { HomePage } from '../pages/Home';
import { TasksPage } from '../pages/Tasks';



export const pagesData = [
    { path: "/", pageTitle: "Home", pageDescription: "This is the home page.", ContentComponent: HomePage },
    { path: "/about", pageTitle: "About", pageDescription: "This is the About page.", ContentComponent: AboutPage },
    { path: '/tasks', pageTitle: "Tasks", pageDescription: "This is the Tasks page.", ContentComponent: TasksPage },
    { path: '/tasks/:workItemId?', pageTitle: "Tasks", pageDescription: "This is the Tasks page.", ContentComponent: TasksPage },

];

