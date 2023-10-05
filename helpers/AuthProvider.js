import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	return (
		<AuthContext.Provider
			value={{ user, setUser, isLoading, setIsLoading, error, setError }}
		>
			{children}
		</AuthContext.Provider>
	);
};
