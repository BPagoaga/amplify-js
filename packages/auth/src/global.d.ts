declare global {
	interface Window {
		IS_MOBILE?: boolean;
		plugins: {
			ASWebAuthSession: IosASWebauthenticationSessionOriginal;
		};
	}
}

export {};
