import { AboutPage } from '../pages/About';
import { HomePage } from '../pages/Home';
import { TasksPage } from '../pages/Tasks';
import { ProjectsPage } from '../pages/Projects';
import { EpicsPage } from '../pages/Epics';
import { TestPage } from '../pages/Test';

/*
export const pagesData = [
    { path: "/", pageTitle: "Home", pageDescription: "This is the home page.", ContentComponent: HomePage },
    { path: "/about", pageTitle: "About", pageDescription: "This is the About page.", ContentComponent: AboutPage },
    { path: '/tasks', endpoint: "/tasks", pageTitle: "Tasks", pageDescription: "This is the Tasks page.", ContentComponent: TasksPage },
    { path: '/tasks/:workItemId?', pageTitle: "Tasks", pageDescription: "This is the Tasks page.", ContentComponent: TasksPage },
    { path: '/projects', endpoint: "/tasks", pageTitle: "Projects", pageDescription: "This is the Projects page.", ContentComponent: ProjectsPage },
    { path: '/projects/:projectId?', pageTitle: "Projects", pageDescription: "This is the Projects page.", ContentComponent: ProjectsPage },
    { path: '/epics', endpoint: "/epics", pageTitle: "Epics", pageDescription: "This is the Epics page.", ContentComponent: EpicsPage },
    { path: '/epics/:epicId?', pageTitle: "Epics", pageDescription: "This is the Epics page.", ContentComponent: EpicsPage }


];

*/

export const pagesData = [
    { path: "/", pageTitle: "Home", pageDescription: "This is the home page.", ContentComponent: HomePage },
    { path: "/about", pageTitle: "About", pageDescription: "This is the About page.", ContentComponent: AboutPage },
    { path: '/test', endpoint: "/tasks", pageTitle: "Test", pageDescription: "This is the Test page.", ContentComponent: TestPage },
    { path: '/projects', endpoint: "/tasks", pageTitle: "Projects", pageDescription: "This is the Projects page.", ContentComponent: ProjectsPage },
    { path: '/projects/:projectId?', pageTitle: "Projects", pageDescription: "This is the Projects page.", ContentComponent: ProjectsPage },

];