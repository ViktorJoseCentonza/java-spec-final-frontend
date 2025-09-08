import { Outlet } from "react-router-dom";
import FooterUi from "../components/Footer";
import Header from "../components/Header";
export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main className="bg-secondary pt-3 pb-3 flex-grow-1">
                <Outlet />
            </main>
            <FooterUi />
        </>
    );
}

