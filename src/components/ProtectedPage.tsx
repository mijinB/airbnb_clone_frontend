import { useEffect } from "react";
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

export default function useProtectedPage() {
    const { isLoggedIn, userLoading } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!userLoading) {
            if (!isLoggedIn) {
                navigate("/");
            }
        }
    }, [isLoggedIn, userLoading, navigate]);

    return;
}
