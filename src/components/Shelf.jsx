import { useState } from "react";
import { NavLink } from "react-router-dom";
import ServerErrorPage from "../pages/ServerErrorPage";
import LoadingUi from "./Loading";

export default function Shelf({ printModels }) {
    const printModelsList = printModels.printModels_data || [];
    const CARD_WIDTH = 250 + 12; // card width + margin
    const visibleCards = 4;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleImageError = (e) => {
        e.currentTarget.src = "/placeholder.jpg";
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
            return <LoadingUi />;

        case "success":
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
                                        <NavLink
                                            className="text-reset text-decoration-none"
                                            to={`/printModels/${model.id}`}
                                        >
                                            <div
                                                className="card bg-dark text-white"
                                                style={{
                                                    width: "250px",
                                                    height: "350px",
                                                    transition: "transform 0.3s",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                }}
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
                                                    <div className="d-flex flex-wrap gap-1">
                                                        {model.tags?.map((tag) => (
                                                            <span key={tag.id} className="badge bg-secondary">
                                                                {tag.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>

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

                        {printModelsList.length > visibleCards && currentIndex < printModelsList.length - visibleCards && (
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

        case "error":
            return <ServerErrorPage error={printModels.message} />;

        default:
            return <ServerErrorPage error="Unknown error occurred, try reloading the page" />;
    }
}
