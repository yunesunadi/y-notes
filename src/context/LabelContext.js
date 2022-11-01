import { createContext, useContext, useReducer, useState } from "react";
import localforage from "localforage";

const labelsContext = createContext(null);
const labelsDispatchContext = createContext(null);

export function useLabels() {
    const labels = useContext(labelsContext);
    const dispatch = useContext(labelsDispatchContext);
    return [labels, dispatch];
}

export const ACTION = {
    ADD: "add",
    DELETE: "delete",
};

function saveItems(newLabels) {
    localforage.setItem("labels", newLabels);
    localStorage.setItem("labels", JSON.stringify(newLabels));
}

function labelsReducer(labels, action) {
    switch (action.type) {
        case ACTION.ADD: {
            const newLabels = [
                ...labels,
                {
                    id: action.id,
                    name: action.name,
                    isSelected: action.isSelected,
                },
            ];
            saveItems(newLabels);
            return newLabels;
        }
        case ACTION.DELETE: {
            const newLabels = labels.filter((label) => label.id !== action.id);
            saveItems(newLabels);
            return newLabels;
        }
        default: {
            throw Error("Unknown action: ", action.type);
        }
    }
}

function useInitialLabels() {
    const localStorageLabels = JSON.parse(localStorage.getItem("labels")) || [];
    const localforageLabels = localforage.getItem("labels") || [];
    const [initialLabels, setInitialLabels] = useState(localStorageLabels);

    localforageLabels.then((data) => {
        setInitialLabels(data);
    });

    return initialLabels;
}

export default function LabelsProvider({ children }) {
    const [labels, dispatch] = useReducer(labelsReducer, useInitialLabels());

    return (
        <labelsContext.Provider value={labels}>
            <labelsDispatchContext.Provider value={dispatch}>
                {children}
            </labelsDispatchContext.Provider>
        </labelsContext.Provider>
    );
}
