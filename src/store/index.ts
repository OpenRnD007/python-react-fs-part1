import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
* Type definition for a shipment object.
*/
export type IShipment = {
    id: number,
    type: string,
    title: string,
    position: number,
    image: string
}

/**
* Interface defining the shape of the store's state.
*/
interface StoreState {
    shipments: IShipment[]; // Array of shipment objects.
    fetchShipmentsDummy: (data: IShipment[]) => void; // Function to populate shipments with dummy data.
    fetchShipments: (abortController: AbortController) => Promise<void>; // Async function to fetch shipments from the server.
}

// Create the store with Zustand and add persistence.
export const useStore = create<StoreState>()(persist((set) => ({
    shipments: [], // Initial state of shipments is an empty array.

    // Function to populate the 'shipments' state with provided dummy data.
    fetchShipmentsDummy: (data: IShipment[]) => {
        set({ shipments: data })
    },

    // Async function to fetch shipments from the server and update the state.
    fetchShipments: async (abortController: AbortController) => {
        try {
            const response = await axios.get('/api/products', {
                signal: abortController.signal // Pass the abort signal to axios
            });
            set({ shipments: response.data });
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axios.isCancel(axiosError)) {
                // Handle the cancellation of the request
                console.log('Fetch products request canceled:', axiosError.message);
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error setting up the request:', error);
            }
        }
    },
}), {
    name: 'meeow-storage'
}))



/**
 * Note
 * The store manages the state of shipments, 
 * providing functions to populate this state with either dummy data or data fetched from a server. 
 * The persist middleware is used to persist the store's state across sessions. 
 * The fetchShipments function is designed to be abortable, allowing for cancellation of in-flight requests, 
 * which is particularly useful for handling component unmounts or navigations. 
 * The store is named 'meeow-storage' for persistence, 
 * which should be replaced with the actual name relevant to the application. 
 * The IShipment type defines the structure of a shipment object within the store's state.
 */