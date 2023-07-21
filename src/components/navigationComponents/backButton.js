import styles from './backButton.module.css'
import { pagesData } from '../../constants/pagesData';
import { RoutingUtil } from '../../utils/routingUtils';


export function BackButton({ path, locationHook }) {
    const [location, setLocation] = locationHook();
    // Check if the current URL has a depth greater than one
    const showBackButton = location.split('/').filter(Boolean).length > 1;

    const newLocation = RoutingUtil.getParentPath({ path: path })  // '/' + segments.slice(0, segments.length - 1).join('/');

    // Handle the back button click to go up one level in the hierarchy
    const handleBackClick = () => {
        if (path.length > 1) {
            // Remove the last segment to go up one level
            setLocation(newLocation);
        }
    };

    return showBackButton ? (
        <div className={styles.backButton} onClick={handleBackClick}>
            <h3>Back to {RoutingUtil.getPageDetailsByPath({ pagesData: pagesData, path: newLocation }).pageTitle}</h3>
        </div>
    ) : null;
}