import Root from "./Root";
import React from "react";
import { AuthProvider } from "./helpers/AuthProvider";

export default function App() {
	return (
		<AuthProvider>
			<Root />
		</AuthProvider>
	);
}
