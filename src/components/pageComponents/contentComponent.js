import styles from './Content.module.css'

export const Content = ({ children }) => {

    return (
        <div className={styles.content}>
            {children}
        </div>

    )

}