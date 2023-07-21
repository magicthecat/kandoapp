import { Switch, Link } from 'wouter';
import { NavigationWrapper } from './components/navigationComponents/navigationWrapper';
import { RoutingUtil } from './utils/routingUtils';
import { Page } from './components/pageComponents/pageTemplate';
import { pagesData } from './constants/pagesData';


function App() {

  return (

    <NavigationWrapper SwitchComponent={Switch} LinkComponent={Link} navigationDataCallBack={RoutingUtil.getPageRouting} >
      {pagesData.map((pageData, index) => (
        <Page
          key={index}
          path={pageData.path}
          metaData={{ pageTitle: pageData.pageTitle, pageDescription: pageData.pageDescription }}
          ContentComponent={pageData.ContentComponent}
        />
      ))}
    </NavigationWrapper>
  );
}

export default App;