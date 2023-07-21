import { Navigation } from "./navigationComponents";
import styles from './navigation.module.css'

export const NavigationWrapper = ({ children, navigationDataCallBack, LinkComponent, SwitchComponent }) => {

    return (
        <div style={styles}>
            <Navigation LinkComponent={LinkComponent} navigationData={navigationDataCallBack(children)} />
            <SwitchComponent>
                {children}
            </SwitchComponent>
        </div>
    );
};
