import { useReducer, useEffect } from "react";
import axiosConfig from "../axiosConfig";

export default function useFetch(url) {
	const initialState = {
		status: url ? "fetching" : "idle",
		data: null,
		error: null,
	};

	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "IDLE":
				return { status: "idle", data: null, error: null };
			case "FETCHING":
				return { status: "fetching", data: null, error: null };
			case "FETCHED":
				return { status: "fetched", data: action.payload, error: null };
			case "ERROR":
				return { status: "error", data: null, error: action.payload };
			default:
				return state;
		}
	}, initialState);

	useEffect(() => {
		const controller = new AbortController();

		if (!url) {
			dispatch({ type: "IDLE" });
			return;
		}

		function fetchData() {
			dispatch({ type: "FETCHING" });

			axiosConfig
				.get(url, { signal: controller.signal })
				.then((response) => {
					dispatch({ type: "FETCHED", payload: response.data });
				})
				.catch((error) => {
					if (error.message !== "canceled") {
						dispatch({ type: "ERROR", payload: error });
					}
				});
		}

		fetchData();

		return function cleanup() {
			controller.abort();
		};
	}, [url]);

	return state;
}
