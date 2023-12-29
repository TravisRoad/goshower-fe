import { create } from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';
import { useState, useEffect } from 'react';

const useStore = <T, F>(
	store: (callback: (state: T) => unknown) => unknown,
	callback: (state: T) => F,
) => {
	const result = store(callback) as F;
	const [data, setData] = useState<F>();

	useEffect(() => {
		setData(result);
	}, [result]);

	return data;
};

const initState = {
	ID: '',
	UserName: '',
	Role: '',
};

const initPreference = {
	mediaSource: {
		Anime: ['Bangumi'],
		Movie: ['TMDB'],
	},
};

const usePreference = create(
	devtools(
		persist(
			combine(initPreference, (set, get) => ({
				Set: (p: any) => {
					set(p);
				},
			})),
			{ name: 'user-preference' },
		),
	),
);

const useUserInfo = create(
	devtools(
		persist(
			combine(initState, (set, get) => ({
				Set: (ui: any) => {
					set(ui);
				},
				Reset: () => {
					set(initState);
				},
			})),
			{ name: 'user-info' },
		),
	),
);

const useTheme = create(
	devtools(
		persist(
			combine(
				{
					theme: '',
				},
				(set, get) => ({
					Set: (s: any) => {
						set(s);
					},
				}),
			),
			{ name: 'theme' },
		),
	),
);

const useGlobalState = create(
	devtools(
		persist(
			combine(
				{
					isNavOpen: false,
				},
				(set, get) => ({
					SetNavOpen: (isOpen: boolean) => {
						set({ isNavOpen: isOpen });
					},
					ToggleNavOpen: () => {
						const x = get().isNavOpen;
						set({ isNavOpen: !x });
					},
				}),
			),
			{ name: 'global-state' },
		),
	),
);

export { useUserInfo, useTheme, useGlobalState, usePreference };
export default useStore;
