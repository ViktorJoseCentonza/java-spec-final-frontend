import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
    let navigate = useNavigate();

    const [query, setQuery] = useState("")
    return (
        <>
            <form className="d-flex" onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search?query=${query}`)

            }}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button className="btn btn-primary" type="submit">Search</button>

            </form>

        </>
    )
}