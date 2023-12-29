'use client';

import useStore, { useGlobalState, useUserInfo } from '@/store/store';
import BurgerButton from './burgerButton';
import {
	HomeIcon,
	ArrowLeftStartOnRectangleIcon,
	MagnifyingGlassIcon,
	BookmarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';

const MenuItem = ({
	children,
	name,
	href,
}: {
	children: React.ReactNode;
	name: string;
	href: string;
}) => {
	return (
		<Link
			href={href}
			className="flex flex-row items-center w-full px-4 py-2 md:hover:bg-nord-5"
			onClick={() => useGlobalState.getState().SetNavOpen(false)}
		>
			<div className="bg-nord-4 p-2 rounded-md">{children}</div>
			<div className="ml-4 text-base"> {name} </div>
		</Link>
	);
};

export default function Sidebar() {
	const isNavOpen = useStore(useGlobalState, (s) => s.isNavOpen);

	return (
		<nav
			className={`h-screen bg-nord-bgLight dark:bg-nord-bgDark w-screen md:w-[--navbar-width] fixed -translate-x-full md:translate-x-0 z-50 transform transition-transform ${
				isNavOpen ? 'translate-x-0' : ''
			}`}
		>
			<div className="flex flex-row py-2 px-4 items-center justify-between md:hidden">
				<div className="w-[50px] h-[50px]"></div>
				<BurgerButton />
			</div>
			<div>
				<MenuItem name="Home" href="/">
					<HomeIcon className="w-5 h-5" />
				</MenuItem>
				<MenuItem name="Record" href="/record">
					<BookmarkIcon className="w-5 h-5" />
				</MenuItem>
				<MenuItem name="Search" href="/search">
					<MagnifyingGlassIcon className="w-5 h-5" />
				</MenuItem>
			</div>
			<div className="absolute bottom-0 w-full flex items-center justify-center p-4 cursor-pointer ">
				<div
					className="flex flex-row items-center md:hover:bg-nord-4 transition-colors px-4 py-3 rounded-md"
					onClick={logout}
				>
					<ArrowLeftStartOnRectangleIcon className="w-6 h-6" />
					<span className="ml-2 text-base select-none">logout</span>
				</div>
			</div>
		</nav>
	);
}

const logout = async () => {
	const success = await fetch('/api/auth/logout', {
		method: 'POST',
	}).then((res) => res.status === 200);
	if (!success) {
		toast.error('Logout fail');
	}
	useUserInfo.getState().Reset();
	useGlobalState.getState().SetNavOpen(false);
	toast.success('Logout success', { duration: 1000 });
	setTimeout(() => {
		window?.location.reload();
	}, 1000);
};
