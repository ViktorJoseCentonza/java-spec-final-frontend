import { useEffect, useState } from "react";

export default function SearchHook(query) {

    const [FoundPrintModels, setFoundPrintModels] = useState({
        state: "loading"
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/search?=${query}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (!data.error) {
                    setFoundPrintModels({
                        state: "success",
                        printModels_data: data
                    })
                } else {
                    setFoundPrintModels({
                        state: "error",
                        message: `You weren't supposed to get here! 404`
                    })
                }
            })
            .catch((err) => {
                setFoundPrintModels({
                    state: "error",
                    message: `error type: ${err}`
                })
            })
    }, [])

    return FoundPrintModels
}
