import { useState } from "react";
import { NavLink } from "react-router-dom";
import ServerErrorPage from "../pages/ServerErrorPage";
import Loading from "./Loading";
import Tags from "./Tags.jsx";

export default function Shelf({ printModels }) {
    const printModelsList = printModels.printModels_data || [];
    const CARD_WIDTH = 250 + 12; // card width + margin
    const visibleCards = 4;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageError = (e) => {
        e.currentTarget.src = "/placeholder.png";
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        const maxIndex = printModelsList.length - visibleCards;
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex >= 0 ? maxIndex : 0));
    };

    switch (printModels.state) {
        case "loading":
            return <Loading />;

        case "success":
            if (printModelsList.length != 0) {
                return (
                    <>
                        <div
                            className="position-relative my-5"
                            style={{
                                width: `${CARD_WIDTH * visibleCards}px`,
                                margin: "0 auto",
                            }}
                        >
                            <div
                                style={{
                                    overflow: "hidden",
                                    width: "100%",
                                    position: "relative",
                                    padding: "1rem 0",
                                }}
                            >
                                <div
                                    className="d-flex"
                                    style={{
                                        transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
                                        transition: "transform 0.4s",
                                        flexWrap: "nowrap",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    {printModelsList.map((model, index) => (
                                        <div
                                            key={`${model.name}-${index}`}
                                            style={{
                                                flexShrink: 0,
                                                width: "250px",
                                                marginRight: "6px",
                                                marginLeft: "6px",
                                            }}
                                        >
                                            <div
                                                className="card bg-dark text-white"
                                                style={{
                                                    width: "250px",
                                                    height: "370px",
                                                    transition: "transform 0.3s",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                }}
                                            >
                                                <NavLink
                                                    className="text-reset text-decoration-none flex-grow-1"
                                                    to={`/printModels/${model.id}`}
                                                    style={{ display: "block" }}
                                                >
                                                    <img
                                                        src={model.image_url}
                                                        onError={handleImageError}
                                                        className="card-img-top object-fit-cover"
                                                        alt={`${model.name}-img`}
                                                        style={{ height: "200px", objectPosition: "top" }}
                                                    />
                                                    <div className="card-body d-flex flex-column justify-content-between">
                                                        <h5 className="card-title text-truncate">{model.name}</h5>
                                                        <p className="card-text text-truncate">{model.description}</p>
                                                    </div>
                                                </NavLink>

                                                <div
                                                    className="card-footer bg-transparent border-0 d-flex flex-wrap gap-1 justify-content-start px-3 pb-3"
                                                    style={{
                                                        marginTop: "auto",
                                                        marginBottom: "0.25rem",
                                                        marginLeft: "0.25rem",
                                                    }}
                                                >
                                                    <Tags tags={model.tags} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            {currentIndex > 0 && (
                                <button
                                    className="btn btn-dark"
                                    onClick={handlePrev}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "-50px",
                                        transform: "translateY(-50%)",
                                        zIndex: 10,
                                        borderRadius: "50%",
                                        width: "40px",
                                        height: "40px",
                                    }}
                                >
                                    ‹
                                </button>
                            )}

                            {printModelsList.length > visibleCards &&
                                currentIndex < printModelsList.length - visibleCards && (
                                    <button
                                        className="btn btn-dark"
                                        onClick={handleNext}
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            right: "-50px",
                                            transform: "translateY(-50%)",
                                            zIndex: 10,
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                        }}
                                    >
                                        ›
                                    </button>
                                )}
                        </div>
                    </>

                );
            }

            return (
                <div
                    className="d-flex flex-column justify-content-center align-items-center text-center my-5"
                    style={{ minHeight: "200px", color: "#f1f1f1" }}
                >
                    <h4 className="fw-semibold mb-2">No Results Found</h4>
                    <p className="mb-0" style={{ color: "#ddd" }}>
                        Try adjusting your search or filters and try again.
                    </p>
                </div>

            )

        case "error":
            return <ServerErrorPage error={printModels.message} />;

        default:
            return <ServerErrorPage error="Unknown error occurred, try reloading the page" />;
    }
}
