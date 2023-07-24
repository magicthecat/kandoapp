
import { useEffect, useState } from 'react';
import styles from './loadingBar.module.css'

export const LoadingBar = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div className={`${styles.loadingBarContainer} ${isLoading ? '' : styles.loaded}`}>
            Loading...
        </div>
    );
};