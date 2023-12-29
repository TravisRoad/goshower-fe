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
		],
	},
};

module.exports = nextConfig;
