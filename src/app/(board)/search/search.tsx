'use client';

import {
	MagnifyingGlassIcon,
	FaceFrownIcon,
	ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { debounce } from 'lodash';

interface Params {
	type: string;
	source: string;
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
	ID: string;
	source: string;
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
		<div className="rounded-md flex flex-row border-2 p-1">
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

const SearchMenu = () => {
	return (
		<div>
			<div></div>
		</div>
	);
};

const SearchItem = ({ item }: { item: SearchResultItem }) => {
	const w = 170,
		h = 260;
	const originalDate = new Date(item.date);
	const formattedDate = originalDate.toISOString().split('T')[0];
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="relative rounded-md overflow-hidden">
				<Image
					src={`https://placehold.co/${w}x${h}png`}
					width={w}
					height={h}
					alt={item.title}
					className="rounded-md"
				/>
				{item.status !== 0 && (
					<div className="w-[8rem] h-8 absolute top-0 -rotate-45 -translate-x-[3rem] translate-y-[1rem] shadow border-2 border-dashed bg-nord-4 text-center pt-0.5">
						{item.status_text}
					</div>
				)}
			</div>
			<div className="flex flex-row items-center justify-between">
				<span>{formattedDate}</span>
				<span>{item.source}</span>
			</div>
			<h1 className="line-clamp-1 w-full px-2 text-center">
				{item.title_cn ? item.title_cn : item.title}
			</h1>
		</div>
	);
};

export default function Search({ isMobile }: { isMobile: boolean }) {
	const [params, setParams] = useState<Params>({
		type: '',
		source: '',
		page: 1,
		size: 10,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const searchFn = useCallback(
		async (query: string) => {
			return fetch(
				`/api/search?q=${query}&type=${params.type}&source=${params.source}`,
			);
		},
		[params],
	);
	const [result, setResult] = useState<SearchResp>();

	const SearchResultComponent = () => {
		return (
			<>
				{result?.data?.items ? (
					<div className=" grid grid-cols-2 gap-2 md:grid-cols-5">
						{result.data.items.map((item: SearchResultItem) => (
							<SearchItem item={item} key={item.ID} />
						))}
					</div>
				) : (
					<div className="relative h-[50dvh]">
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
			<div className="relative h-[50dvh]">
				<div className="flex flex-col items-center justify-center top-1/2 absolute w-full -translate-y-1/2">
					<ArrowPathIcon className="w-36 h-36 stroke-nord-4/50 animate-spin" />
					<div className="text-nord-4/80 text-lg">loading</div>
				</div>
			</div>
		);
	};

	return (
		<div className="px-4">
			<div className="w-full pt-4">
				<SearchBar
					setResult={setResult}
					searchFn={searchFn}
					setLoading={setLoading}
				/>
			</div>
			<div className="w-full pt-4">
				{loading ? <Loading /> : <SearchResultComponent />}
			</div>
		</div>
	);
}
