// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';
import { OpenAuthSession, OpenAuthSessionResult } from './types';

export const openAuthSession: OpenAuthSession = async (url: string) => {
	// ORIGINAL IMPLEMENTATION START
	//window.location.href = url.replace('http://', 'https://');
	// ORIGINAL IMPLEMENTATION END

	// PATCHED IMPLEMENTATION START
	const isMobile = window.IS_MOBILE;
	const secureUrl = url.replace('http://', 'https://');

	if (isMobile) {
		const platform = (await Device.getInfo()).platform;
		if (platform === 'ios') {
			const queryParams = {
				origin: 'IOSAPP',
			};
			const ssoUrl = new URL(secureUrl);
			const params = ssoUrl.searchParams;
			params.append(
				'relayState',
				encodeURIComponent(JSON.stringify(queryParams)),
			);

			return window.plugins.ASWebAuthSession.start(
				'jooxter',
				ssoUrl.toString(),
				(responseUrl: string) => {
					console.log('SAML response', responseUrl);
					window.location.href = responseUrl;
				},
				(e: Error) => {
					console.error('Err saml', e.message);

					return {
						type: 'error' as OpenAuthSessionResult['type'],
						error: e.message,
					};
				},
			);
		}
		return await Browser.open({ url: secureUrl });
	} else {
		window.location.href = secureUrl;
	}
	// PATCHED IMPLEMENTATION END
};
