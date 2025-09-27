import { NavLink } from "react-router-dom"
import ServerErrorPage from "../pages/ServerErrorPage"
import LoadingUi from "./Loading"
export default function Shelf({ printModels }) {

    const printModelsList = printModels.printModels_data

    switch (printModels.state) {
        case 'loading':
            return <LoadingUi />

        case 'success':
            console.log(printModelsList)
            return (

                <>
                    <h1 className="ps-5">Current printModels</h1>
                    <div className="d-flex justify-content-start gap-3 mx-3 flex-wrap">

                        {printModelsList.map((singlePrintModel, index) => {
                            return (
                                <NavLink className="text-reset text-decoration-none" key={`${singlePrintModel.name}-card-${index}`
                                } to={`/printModels/${singlePrintModel.id}`}>
                                    <div className="p-2 bg-dark rounded position-relative d-flex flex-column justify-content-between align-items-center" style={{ width: "250px", height: "300px" }} >
                                        <div>
                                            <h2 className="overflow-hidden" >{singlePrintModel.name}</h2>
                                        </div>
                                        <img className="flex-grow-1 object-fit-cover" src={`${singlePrintModel.image_url}`} alt={`${singlePrintModel.name}-img`} />
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                </>
            )

        case 'error':
            return <ServerErrorPage error={printModels.message} />

        default:
            return <ServerErrorPage error="unknown error occured, try reloading the page" />
    }
}