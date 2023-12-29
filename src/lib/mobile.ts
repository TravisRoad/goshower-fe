'use server';

import { headers } from 'next/headers';

export async function useMobile() {
	const ua = headers().get('user-agent');
	if (!ua) return false;
	return /Mobi/.test(ua);
}
