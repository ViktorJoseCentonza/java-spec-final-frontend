import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Shelf from "../components/Shelf";

export default function SearchResultPage() {


    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");


    const [FoundPrintModels, setFoundPrintModels] = useState({
        state: "loading"
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/printModels/search?query=${query}`)
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
    }, [searchParams])

    return (
        <Shelf printModels={FoundPrintModels} />
    )
}