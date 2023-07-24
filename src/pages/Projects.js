import { CrudTemplate } from '../templates/CrudTemplate';



export const ProjectsPage = () => {


    return (
        <>
            <CrudTemplate routing={{ endpoint: 'projects', url: "projects" }} excludeProperties={['id']} />

        </>
    )

}