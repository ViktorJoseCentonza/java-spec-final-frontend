import { NavLink } from "react-router-dom"
function Header() {


    return (
        <>
            <header className="d-flex justify-content-evenly align-items-center">
                <NavLink className="text-decoration-none" to="/" ><h1>Some name</h1></NavLink>
                <nav className="d-flex gap-4 text-decoration-none fs-5 fw-bold">
                    <NavLink to="/" >Home</NavLink >
                    <NavLink to="#" >Popular</NavLink >
                    <NavLink to="#" >Our Favourites</NavLink >
                </nav>
            </header >
        </>
    )
}

export default Header