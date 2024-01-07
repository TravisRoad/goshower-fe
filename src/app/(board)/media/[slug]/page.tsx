'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export interface DetailResp {
	code: number;
	msg: string;
	data: Detail;
}

export interface Detail {
	source: number;
	type: number;
	link: string;
	media_id: number;
	title: string;
	title_cn: string;
	summary: string;
	publish_date: string;
	nsfw: boolean;
	platform: string;
	image_large: string;
	image_common: string;
	image_medium: string;
	eps: number;
	rating_score: number;
}

const detail = (id: string): Promise<Response> => {
	return fetch(`/api/media/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});
};

export default function Page({ params }: { params: { slug: string } }) {
	const [data, setData] = useState<Detail>();
	useEffect(() => {
		detail(params.slug)
			.then((res) => res.json())
			.then((res) => {
				const r = res as DetailResp;
				setData(r.data);
			})
			.catch(console.log);
	}, []);

	if (!data) {
		return <div> loading </div>;
	}

	return (
		<div className="px-4 w-full sm:pt-12 pt-4 flex flex-col items-center">
			<div className="flex sm:flex-row flex-col items-center justify-center sm:gap-x-4 gap-y-4">
				<Image
					src={data.image_medium}
					alt={data.title}
					width={240}
					height={360}
					className="rounded-md aspect-auto"
				/>
				<div className="flex-1">
					<h1 className="text-xl">{data.title}</h1>
					<span>{data.publish_date}</span>
				</div>
			</div>
			<div>
				<button> add </button>
			</div>
		</div>
	);
}
