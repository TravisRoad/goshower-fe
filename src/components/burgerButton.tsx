'use client';

import useStore, { useGlobalState } from '@/store/store';

const BurgerButton = () => {
	const isNavOpen = useStore(useGlobalState, (s) => s.isNavOpen);
	const toggleNavOpen = useGlobalState((s) => s.ToggleNavOpen);
	return (
		<>
			<button
				onClick={() => {
					if (toggleNavOpen !== undefined) {
						toggleNavOpen();
					}
				}}
			>
				<div className="burger relative" data-opened={isNavOpen}></div>
			</button>
		</>
	);
};

export default BurgerButton;
