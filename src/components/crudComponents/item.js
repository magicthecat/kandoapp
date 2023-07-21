import styles from './ListItem.module.css';

export const Item = ({ item, itemHandleClick, excludeProperties = [] }) => {
    const filteredKeys = Object.keys(item).filter((key) => !excludeProperties.includes(key));

    return (
        <div className={styles.card} key={item.id} onClick={() => itemHandleClick(item.id)}>
            {filteredKeys.map((key) => (
                <div key={key}>
                    <strong>{key}: </strong>
                    <span>{item[key]}</span>
                </div>
            ))}
        </div>
    );
};