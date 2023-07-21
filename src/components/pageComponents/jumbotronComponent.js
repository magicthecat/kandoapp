import styles from './Jumbotron.module.css';

export const Jumbotron = ({ title, children }) => {
    return (
        <div className={styles.jumbotron}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};