import React from 'react';
import { Switch, Link } from 'wouter';
import styles from './App.module.css';
import { NavigationWrapper } from './components/navigationComponents';
import { RoutingUtil } from './utils/routingUtils';
import { Page } from './components/pageTemplate';



function App() {
  return (
    <div className={styles.App}>
      <NavigationWrapper SwitchComponent={Switch} LinkComponent={Link} navigationDataCallBack={RoutingUtil.getPageRouting} >
        <Page path="/" metaData={{ pageTitle: "Home", pageDescription: "This is the home page." }}   >
          <p>this is the home page</p>
        </Page>
        <Page path="/about" metaData={{ pageTitle: "About", pageDescription: "This is the About page." }}   >
          <p>this is the about page</p>
        </Page>
        <Page path="/contact" metaData={{ pageTitle: "Contact", pageDescription: "This is the Contact page." }}   >
          <p>this is the contact page</p>
        </Page>
      </NavigationWrapper>
    </div>
  );
}

export default App;