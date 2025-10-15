import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch.js"
import Shelf from "../components/Shelf";

export default function SearchResultPage() {


    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    return (
        <>
            <h1 className="text-center my-4 text-light">
                Search Results for <span className="text-primary">"{query}"</span>
            </h1>
            <Shelf printModels={useSearch(query)} />
        </>

    )
}