import styles from './ListItem.module.css'


export const List = ({ children }) => {


    return (
        <div className={styles.container}>
            {children}
        </div>


    )
}