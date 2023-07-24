import { CrudTemplate } from '../templates/CrudTemplate';



export const EpicsPage = () => {


    return (
        <>
            <CrudTemplate routing={{ endpoint: 'epics', url: "epics" }} excludeProperties={['id']} />
        </>
    )

}