
import Shelf from "../components/Shelf"
import SearchHook from "../hooks/SearchHook"
export default function Home() {

    return (
        <div>
            <h2 className="ms-5">PLA</h2>
            <Shelf printModels={SearchHook("PLA")} />
            <h2 className="ms-5">PETG</h2>
            <Shelf printModels={SearchHook("PETG")} />
            <h2 className="ms-5">ASA</h2>
            <Shelf printModels={SearchHook("ASA")} />
        </div>
    )
}