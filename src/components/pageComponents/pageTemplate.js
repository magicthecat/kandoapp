import { Route, useLocation } from 'wouter';
import { Jumbotron } from './jumbotronComponent';
import { Content } from './contentComponent';
import { BackButton } from '../navigationComponents/backButton';

const AccessibilityData = ({ metaData }) => {

    return (
        <>
            <title>{metaData.pageTitle}</title>
            <meta name="description" content={metaData.pageDescription} />
        </>


    )

}

export const Page = ({ path, metaData, ContentComponent }) => {
    return (
        <>

            <Route path={path} >
                <AccessibilityData metaData={metaData} />

                <Jumbotron title={metaData.pageTitle} >
                    <p>{metaData.pageDescription}</p>
                </Jumbotron>
                <BackButton path={path} locationHook={useLocation} />
                <Content>
                    <ContentComponent />
                </Content>
            </Route>
        </>)
}
