import { NavLink } from "react-router-dom";

export default function Tags({ tags }) {
    return (

        tags?.map((tag) => (
            <NavLink
                key={tag.id}
                className="badge text-decoration-none"
                to={`/search?query=${tag.name}`}
                style={{
                    transition: "transform 0.2s ease, background-color 0.2s ease",
                    cursor: "pointer",
                    background: "#0A5ED7"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.backgroundColor = "#188754";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = "#0A5ED7";
                }}
            >
                {tag.name}
            </NavLink>
        ))

    )
}