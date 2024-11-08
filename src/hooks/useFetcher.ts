import { useAuth } from "providers/AuthProvider";

// POST
export const useFetcher = (
    url: string,
    method = "POST"
) => {
    const { userData, setError } = useAuth();

    const fetcher = async (body = {}) => {
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}${url}`, {
            method,
            headers: {
                "Authorization": userData.token ?? '',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!response!.ok) {
            setError("Network response was not ok");
            throw new Error("Network response was not ok");
        }
        return await response!.json();
    }

    return fetcher;
}