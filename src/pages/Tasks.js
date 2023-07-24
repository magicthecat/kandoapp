import { CrudTemplate } from '../templates/CrudTemplate';


export const TasksPage = () => {


    return (
        <CrudTemplate routing={{ endpoint: 'workItems', url: "tasks" }} excludeProperties={['id', 'epicId']} />
    )

}