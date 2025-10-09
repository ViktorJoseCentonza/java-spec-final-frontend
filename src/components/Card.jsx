import { useParams } from "react-router-dom";
import { usePrintModels } from "../contexts/GlobalContext";
import ServerErrorPage from "../pages/ServerErrorPage";
import LoadingUi from "./Loading";
import Tags from "./Tags";

export default function Card() {
    const { id } = useParams();
    const { printModels } = usePrintModels();

    switch (printModels.state) {
        case "loading":
            return <LoadingUi />;

        case "success":
            const singlePrintModel = printModels.printModels_data.find(
                (model) => String(model.id) === String(id)
            );

            if (!singlePrintModel) {
                return (
                    <ServerErrorPage error="The element you are looking for couldn't be found - 404" />
                );
            }

            return (
                <div className="container pt-5">
                    <div
                        className="card bg-dark text-white mx-auto"
                        style={{
                            maxWidth: "800px",
                            overflow: "visible",
                            borderRadius: "1rem",
                        }}
                    >
                        <img
                            src={singlePrintModel.image_url}
                            alt={`${singlePrintModel.name}-img`}
                            className="card-img-top object-fit-cover"
                            style={{
                                maxHeight: "400px",
                                objectPosition: "top",
                                borderTopLeftRadius: "1rem",
                                borderTopRightRadius: "1rem",
                            }}
                            onError={(e) => {
                                e.currentTarget.src = "/placeholder.png";
                            }}
                        />
                        <div className="card-body ">
                            <h2 className="card-title mb-3">{singlePrintModel.name}</h2>
                            <p className="fs-5">{singlePrintModel.description}</p>
                            <div className="d-flex gap-1">
                                <Tags tags={singlePrintModel.tags} />
                            </div>

                        </div>
                    </div>
                </div>
            );

        case "error":
            return <ServerErrorPage error={printModels.message} />;

        default:
            return (
                <ServerErrorPage error="Unknown error occurred, try reloading the page" />
            );
    }
}
