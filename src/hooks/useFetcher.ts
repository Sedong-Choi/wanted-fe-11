import { HttpMethods } from "msw";
import { useAuth } from "providers/AuthProvider";
import { useCallback } from "react";
type Method = keyof typeof HttpMethods
export const useFetcher = (
    url: string,
    method?: Method
) => {
    const { userData, setError } = useAuth();
    const fetcher = useCallback(async (body = {}) => {
        let options = {};
        switch (method) {
            case "GET":
                options = {
                    headers: {
                        "Authorization": userData.token ?? '',
                    }
                }
                break;
            case "POST":
            case "DELETE":
            case "PUT":
                options = {
                    method: method.toUpperCase(),
                    headers: {
                        "Authorization": userData.token ?? '',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                };
                break;
        }
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}${url}`, options);

        if (!response!.ok) {
            setError("Network response was not ok");
            throw new Error("Network response was not ok");
        }
        return await response!.json();
    }, [userData, method, url, setError]);

    return fetcher;
}