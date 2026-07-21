import { useLocation } from "react-router"

export const useDocumentTitle = () => {
const location = useLocation()
    const path = location.pathname.slice(11) // removes /dashboard/ from the path

    return path === "" ? "Dashboard" : path.charAt(0).toUpperCase() + path.slice(1)
}