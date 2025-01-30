// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Browser } from '@capacitor/browser';
import { OpenAuthSession } from './types';

export const openAuthSession: OpenAuthSession = async (url: string) => {
	// ORIGINAL IMPLEMENTATION START
	//window.location.href = url.replace('http://', 'https://');
	// ORIGINAL IMPLEMENTATION END

	// PATCHED IMPLEMENTATION START
	const isMobile = window.IS_MOBILE;
	const secureUrl = url.replace('http://', 'https://');

	if (isMobile) {
		await Browser.open({ url: secureUrl });
	} else {
		window.location.href = secureUrl;
	}
	// PATCHED IMPLEMENTATION END
};
