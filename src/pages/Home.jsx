
import Shelf from "../components/Shelf"
import { usePrintModels } from "../contexts/GlobalContext"
export default function Home() {

    const { printModels } = usePrintModels()

    return (
        <div>
            <Shelf printModels={printModels} />
        </div>
    )
}