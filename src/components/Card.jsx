import { useParams } from "react-router-dom";
import { usePrintModels } from "../contexts/GlobalContext";
import ServerErrorPage from "../pages/ServerErrorPage";
import LoadingUi from "./LoadingUi";

export default function Card() {

    const { id } = useParams();
    const { printModels } = usePrintModels();

    switch (printModels.state) {
        case 'loading':
            return <LoadingUi />
        case 'success':
            const singlePrintModel = printModels.printModels_data.find(
                (model) => model.id == id
            );

            if (singlePrintModel == null) {
                return <ServerErrorPage message="the element you are looking for couldn't be found - 404" />
            }
            //console.log(singlePrintModel)
            return (
                <>
                    <div className="container pt-5">
                        <div className="p-2 d-flex bg-dark rounded">
                            <div className="w-25">
                                <img className="card-img-top" src={`${singlePrintModel.image_url}`} alt={`${singlePrintModel.name}-img`}></img >
                            </div>
                            <div className="ps-4 w-75">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="card-title">{singlePrintModel.name}</h2>

                                </div>
                                <p className="mt-2 PrintModel_info fs-5">{singlePrintModel.description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        case 'error':
            return <ServerErrorPage error={printModels.message} />

        default:
            return <ServerErrorPage error="unknown error occured, try reloading the page" />
    }

}