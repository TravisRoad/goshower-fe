import Login from '@/components/auth/login';
import Image from 'next/image';
import isLogin from '@/lib/auth';

const Auth = async () => {
	const hasLogin = await isLogin();
	return (
		<div className="md:w-full pt-8 mx-auto">
			<Image
				src="/placeholder/400.png"
				height={400}
				width={400}
				alt="placeholder"
				className="mx-auto max-w-[66%] mb-2"
			/>
			<div className="mx-4">
				<Login hasLogin={hasLogin} />
			</div>
		</div>
	);
};

export default Auth;
