import { Route } from 'wouter';



export const Page = ({ path, children, metaData }) => {

    return (
        <>
            <title>{metaData.pageTitle}</title>
            <meta name="description" content={metaData.pageDescription} />

            <Route path={path} >{children}</Route>
        </>)
}
