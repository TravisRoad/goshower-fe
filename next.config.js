const rewrites = async () => {
	return [
		{
			source: '/api/:path*',
			destination: 'http://localhost:8080/api/:path*',
		},
	];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'lain.bgm.tv',
				port: '',
			},
			{
				protocol: 'http',
				hostname: 'lain.bgm.tv',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
