import { useEffect } from "react"
import { dummyShipments } from "../../../store/dummyData"
import { IShipment, useStore } from "../../../store"

/**
* A custom hook that initializes the shipment listing in the application's state store.
* It is designed to be used when the component mounts to populate the store with dummy shipment data.
* I had specially used custom hook because in other part we had planned to used interval and updatation logic
*/
const useSetShipmentListing = (): void => {
    const fetchShipments = useStore((state: { fetchShipmentsDummy: (shipments: IShipment[]) => void }) => state.fetchShipmentsDummy);

    useEffect(() => {
        // Populate the store with dummy shipments
        fetchShipments(dummyShipments);
    }, [fetchShipments]);
}

export default useSetShipmentListing;

/**
 * Note
 * The useSetShipmentListing hook is part of the application's state management logic. 
 * It leverages the useStore hook to dispatch an action that populates the store with a predefined list of dummy shipments. 
 * This hook should be used within a component that requires the shipment data to be initialized when the component is first rendered. 
 * The useEffect hook ensures that the action is only dispatched once when the component mounts, as indicated by the empty dependency array. 
 * The dummyShipments data is imported from a local module and represents the initial state of the shipment data in the store.
 */