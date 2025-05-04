import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import ServicesHome from "../components/ServicesHome"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    
    const basename = import.meta.env.VITE_BACKEND_URL;
    if(! basename ||  basename == "") return (
        <div>
            <h1 className="text-center mt-5">Backend URL not set</h1>
            <p className="lead text-center">Please set the backend URL in the .env file.</p>
        </div>
    );

    return (
        
        <ScrollToTop>
             <Navbar />
            <ServicesHome/>
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}