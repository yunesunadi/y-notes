import { createContext, useContext, useReducer } from "react";

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
    return JSON.parse(localStorage.getItem("labels")) || [];
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
