import Shelf from "../components/Shelf";
import { usePrintModels } from "../contexts/GlobalContext";

export default function PrintModelsPage() {
    const { printModels } = usePrintModels()
    return (
        <div>
            <h1 className="ms-5">Most Popular Models</h1>
            <Shelf printModels={printModels} />
        </div>
    )
}