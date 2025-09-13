import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"
function Header() {


    return (
        <>
            <header className="d-flex justify-content-evenly align-items-center">
                <NavLink className="text-decoration-none" to="/" ><h1>BoolPrint</h1></NavLink>
                <nav className="d-flex gap-4 text-decoration-none fs-5 fw-bold">
                    <NavLink to="/" >Home</NavLink >
                    <NavLink to="#" >Popular</NavLink >
                    <NavLink to="#" >Our Favourites</NavLink >
                    <SearchBar />
                </nav>
            </header >
        </>
    )
}

export default Header