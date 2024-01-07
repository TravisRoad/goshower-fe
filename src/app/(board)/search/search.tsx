'use client';

import {
	MagnifyingGlassIcon,
	FaceFrownIcon,
	ArrowPathIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { debounce } from 'lodash';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

interface Params {
	type: number;
	source: number;
	page: number;
	size: number;
}

interface SearchResp {
	code: number;
	data: SearchResult;
	msg: string;
}

interface SearchResult {
	total: number;
	items: SearchResultItem[];
}

interface SearchResultItem {
	id: string;
	source: number;
	title: string;
	title_cn: string;
	description: string;
	date: string;
	author: any;
	rating: number;
	status: number;
	status_text: string;
	pic: string;
}

type field = {
	name: string;
	callback: () => void;
};

const SearchBar = ({
	searchFn,
	setResult,
	setLoading,
}: {
	searchFn: (query: string) => Promise<Response>;
	setResult: (resp: SearchResp) => void;
	setLoading: (loading: boolean) => void;
}) => {
	const [query, setQuery] = useState<string>('');

	const onClick = () => {
		setLoading(true);
		searchFn(query)
			.then((res) => res.json())
			.then(setResult)
			.then(() => {
				setLoading(false);
			});
	};
	return (
		<div className="rounded-md flex flex-row border-2">
			<input
				type="text"
				className="flex-1 rounded-md pl-4 outline-none "
				onChange={(e) => setQuery(e.target.value)}
			/>
			<MagnifyingGlassIcon
				className="w-8 h-8 ml-2 mr-1 stroke-nord-10 stroke-2 cursor-pointer"
				onClick={debounce(onClick, 300)}
			/>
		</div>
	);
};

const SearchItem = ({ item }: { item: SearchResultItem }) => {
	const w = 170,
		h = 260;
	const originalDate = new Date(item.date);
	const formattedDate = originalDate.toISOString().split('T')[0];
	return (
		<Link
			href={`/media/${item.id}`}
			className="flex flex-col items-center justify-center hover:bg-nord-6/50 md:p-2 pb-2 rounded-md"
		>
			<div className="relative rounded-md overflow-hidden">
				<div className="h-[260px] flex">
					<Image
						src={
							item.pic.length > 0
								? item.pic
								: `https://placehold.co/${w}x${h}png`
						}
						width={w}
						height={h}
						alt={item.title}
						className="rounded-md aspect-auto shadow border border-nord-4 my-auto"
					/>
				</div>
				{item.status !== 0 && (
					<div className="w-[8rem] h-8 absolute top-0 -rotate-45 -translate-x-[3rem] translate-y-[1rem] shadow border-2 border-dashed bg-nord-4 text-center pt-0.5">
						{item.status_text}
					</div>
				)}
			</div>
			<div className="flex flex-row items-center justify-center">
				<div>{formattedDate}</div>
			</div>
			<h1 className="line-clamp-1 w-full px-2 text-center">
				{item.title_cn ? item.title_cn : item.title}
			</h1>
		</Link>
	);
};

export default function Search({ isMobile }: { isMobile: boolean }) {
	const [params, setParam] = useState<Params>({
		type: 1,
		source: 1,
		page: 1,
		size: 10,
	});
	const [sources, setSources] = useState<field[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const searchFn = useCallback(
		async (query: string) => {
			return fetch(
				`/api/search?q=${query}&type=${params.type}&source=${params.source}&page=${params.page}&size=${params.size}`,
			);
		},
		[params],
	);
	const [result, setResult] = useState<SearchResp>();

	const SearchResultComponent = () => {
		return (
			<>
				{result?.data?.items && result.data.items.length != 0 ? (
					<div className=" grid grid-cols-2 gap-2 md:grid-cols-4">
						{result.data.items.map((item: SearchResultItem) => (
							<SearchItem item={item} key={item.id} />
						))}
					</div>
				) : (
					<div className="relative h-[50dvh] select-none">
						<div className="flex flex-col items-center justify-center top-1/2 absolute w-full -translate-y-1/2">
							<FaceFrownIcon className="w-36 h-36 stroke-nord-4/50" />
							<div className="text-nord-4/80 text-lg">
								nothing
							</div>
						</div>
					</div>
				)}
			</>
		);
	};

	const Loading = () => {
		return (
			<div className="relative h-[50dvh] select-none">
				<div className="flex flex-col items-center justify-center top-1/2 absolute w-full -translate-y-1/2">
					<ArrowPathIcon className="w-36 h-36 stroke-nord-4/50 animate-spin" />
					<div className="text-nord-4/80 text-lg">loading</div>
				</div>
			</div>
		);
	};

	const setParamSource = (x: number) => setParam({ ...params, source: x });

	const _searchMenu = () => {
		const sourceMap: { [k: number]: string } = {
			1: 'bangumi',
			2: 'TMDB',
		};
		const typeMap: { [k: number]: string } = {
			1: 'anime',
			2: 'movie',
		};
		const types: field[] = [
			{
				name: 'anime',
				callback: () => {
					setParam({ ...params, type: 1, source: 1 });
					setSources([
						{ name: 'bangumi', callback: () => setParamSource(1) },
					]);
				},
			},
			{
				name: 'movie',
				callback: () => {
					setParam({ ...params, type: 2, source: 2 });
					setSources([
						{ name: 'TMDB', callback: () => setParamSource(2) },
					]);
				},
			},
		];
		const InnerMenu = ({ name, lz }: { name: string; lz: field[] }) => {
			return (
				<Menu
					as="div"
					className="flex-1 relative border-2 rounded-md py-1"
				>
					<Menu.Button className="w-full text-lg sm:text-base relative ">
						{name}
						<ChevronDownIcon
							className="w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2 mr-2 stroke-nord-3"
							aria-hidden="true"
						/>
					</Menu.Button>
					<Menu.Items className="w-full border rounded-md absolute top-[2.5rem] z-10 px-2 py-1 bg-nord-6 text-lg sm:text-base shadow-sm ">
						{lz.map((type) => (
							<Menu.Item
								as="button"
								key={type.name}
								onClick={type.callback}
								className="block w-full sm:hover:bg-nord-4 rounded-md py-1"
							>
								{type.name}
							</Menu.Item>
						))}
					</Menu.Items>
				</Menu>
			);
		};
		return (
			<div className="w-full flex flex-row items-center mt-2 gap-x-4">
				<InnerMenu name={typeMap[params.type]} lz={types} />
				<InnerMenu name={sourceMap[params.source]} lz={sources} />
			</div>
		);
	};
	const SearchMenu = memo(_searchMenu);

	return (
		<div className="px-4">
			<div className="w-full pt-4">
				<SearchBar
					setResult={setResult}
					searchFn={searchFn}
					setLoading={setLoading}
				/>
				<SearchMenu />
			</div>
			<div className="w-full pt-4">
				{loading ? <Loading /> : <SearchResultComponent />}
			</div>
		</div>
	);
}
