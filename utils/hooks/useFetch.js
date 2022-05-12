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
		let cancelRequest = false;

		if (!url) {
			dispatch({ type: "IDLE" });
			return;
		}

		function fetchData() {
			dispatch({ type: "FETCHING" });

			axiosConfig
				.get(url)
				.then((response) => {
					if (cancelRequest) {
						dispatch({ type: "IDLE" });
						return;
					}

					dispatch({ type: "FETCHED", payload: response.data });
				})
				.catch((error) => {
					if (cancelRequest) {
						dispatch({ type: "IDLE" });
						return;
					}

					dispatch({ type: "ERROR", payload: error });
				});
		}

		fetchData();

		return function cleanup() {
			cancelRequest = true;
		};
	}, [url]);

	return state;
}
