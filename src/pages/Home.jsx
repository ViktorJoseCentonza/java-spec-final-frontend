
import Shelf from "../components/Shelf"
import useSearch from "../hooks/useSearch"
export default function Home() {

    return (
        <div>
            <h2 className="ms-5">PLA</h2>
            <Shelf printModels={useSearch("PLA")} />
            <h2 className="ms-5">PETG</h2>
            <Shelf printModels={useSearch("PETG")} />
            <h2 className="ms-5">ASA</h2>
            <Shelf printModels={useSearch("ASA")} />
        </div>
    )
}