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
                    <div className="d-flex gap-3 justify-content-center">

                        {printModelsList.map((singlePrintModel, index) => {
                            { console.log(singlePrintModel) }
                            return (
                                <NavLink key={`${singlePrintModel.name}-card-${index}`
                                } to={`/printModels/${singlePrintModel.id}`}>
                                    <div className="p-2 bg-dark rounded position-relative d-flex flex-column justify-content-between align-items-center" >
                                        <div className="img-wrap">
                                            <img className="img-fluid" style={{ height: "280px" }} src={`${singlePrintModel.image_url}`} alt={`${singlePrintModel.name}-img`} />
                                        </div>
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