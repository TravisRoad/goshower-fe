import Sidebar from '@/components/sidebar';
import { useMobile } from '@/lib/mobile';
import MobileHeader from '@/components/mobile/mobileHeader';
import { redirectToLogin } from '@/lib/auth';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isMobile = await useMobile();
	await redirectToLogin();
	return (
		<>
			<Sidebar />
			<div className="md:pl-[--navbar-width] w-screen h-screen">
				<main className="max-w-4xl mx-auto">
					{isMobile && <MobileHeader />}
					{children}
				</main>
			</div>
		</>
	);
}
