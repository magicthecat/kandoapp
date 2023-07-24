import { LoadingBar } from "../components/navigationComponents/loadingBarComponent";
import { useItemSelection } from "../hooks/itemSelectionHook";
import { List } from "../components/crudComponents/list";
import { Item } from "../components/crudComponents/item";

export const CrudTemplate = ({ routing, excludeProperties, isEpicsPage }) => {
    const { items, selectedItemId, isLoading, isItemLoading, handleItemClick } = useItemSelection({
        endpoint: routing.endpoint,
        url: routing.url,
    });

    if (isLoading) {
        return <LoadingBar />;
    }

    if (selectedItemId) {
        // Render the single item component if an item is selected
        const selectedItem = items.find((item) => item.id === selectedItemId);
        if (!selectedItem) {
            return <LoadingBar />;
        }


        return (
            <>
                <h1>{selectedItem.name}</h1>
                <p>{selectedItem.description}</p>
            </>
        );
    }

    return (
        <>

            <List>
                {items.map((item) => (
                    <Item
                        key={item.id}
                        excludeProperties={excludeProperties}
                        item={item}
                        itemHandleClick={() => handleItemClick(item.id)}
                    />
                ))}
            </List>
        </>
    );
};
