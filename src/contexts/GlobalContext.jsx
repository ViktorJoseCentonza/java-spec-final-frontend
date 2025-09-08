import { createContext, useContext, useEffect, useState } from "react";

const PrintModelsContext = createContext();

function PrintModelsProvider({ children }) {

    const [printModels, setPrintModels] = useState({
        state: "loading"
    })

    useEffect(() => {
        fetch("http://localhost:8080/api/printModels")
            .then((res) => res.json())
            .then((data) => {
                setPrintModels({
                    state: "success",
                    printModels_data: data
                })
            })
            .catch((err) => {
                setPrintModels({
                    state: "error",
                    message: `error type: ${err}`
                })
            })
    }, [])

    return (
        <PrintModelsContext.Provider
            value={{ printModels }}
        >
            {children}
        </PrintModelsContext.Provider>
    );
}

function usePrintModels() {
    const context = useContext(PrintModelsContext);
    return context;
}



export { PrintModelsProvider, usePrintModels };

