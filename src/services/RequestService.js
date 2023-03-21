import { useCallback, useState } from "react";

const useRequestService = () => {
    const _apiBase = 'https://rickandmortyapi.com/api/';
    const [loading, setLoading] = useState(false);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            throw e;
        }
    }, []);

    const getAllCharacters = async () => {
        const res = await request(`${_apiBase}character`);
        return res.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}character/${id}`);
        return _transformCharacter(res);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            gender: char.gender,
            status: char.status,
            specie: char.species,
            origin: char.origin.name,
            type: char.type ? char.type : 'Unknown',
            image: char.image
        }
    }

    return {
        getAllCharacters,
        getCharacter,
        loading
    }
}

export default useRequestService;