import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServerErrorPage from "../pages/ServerErrorPage";
import Loading from "./Loading";
import Tags from "./Tags";

export default function Card() {
    const { id } = useParams();


    const [printModel, setPrintModel] = useState({
        state: "loading"
    })

    useEffect(() => {
        fetch(`http://localhost:8080/api/printModels/${id}`)
            .then((res) => {
                if (!res.ok) {
                    setPrintModel({
                        state: "error",
                        message: `error type: ${res.status}`
                    })
                    throw new Error(`HTTP error ${res.status}`);
                }
                return res.json()
            })
            .then((data) => {
                setPrintModel({
                    state: "success",
                    printModel_data: data
                })
            })
            .catch((err) => {
                setPrintModel({
                    state: "error",
                    message: `error type: ${err}`
                })
            })
    }, [])



    switch (printModel.state) {
        case "loading":
            return <Loading />;

        case "success":
            const singlePrintModel = printModel.printModel_data

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
            return <ServerErrorPage error={printModel.message} />;

        default:
            return (
                <ServerErrorPage error="Unknown error occurred, try reloading the page" />
            );
    }
}
