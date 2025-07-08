import { useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";

type UseRequestResult<T = any> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    request: (
        method: Method,
        url: string,
        payload?: any,
        headers?: Record<string, string>
    ) => Promise<void>;
};

export function useRequest<T = any>(): UseRequestResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const request = async (
        method: Method,
        url: string,
        payload?: any,
        headers?: Record<string, string>
    ) => {
        setLoading(true);
        setError(null);
        setData(null);

        // Monta a configuração da requisição
        const config: AxiosRequestConfig = {
            method,
            url: `http://localhost:5000${url}`,
            headers: headers || undefined,
            data: payload || undefined,
        };

        try {
            const response = await axios(config);
            setData(response.data);
            return response?.data
        } catch (err: any) {
            setError(
                err.response?.data?.error ||
                err.message ||
                "Erro desconhecido"
            );
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, request };
}
