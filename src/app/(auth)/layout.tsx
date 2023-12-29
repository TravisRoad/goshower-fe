import { useMobile } from '@/lib/mobile';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const isMobile = await useMobile();
	return (
		<>
			<main className="mx-auto max-w-5xl">{children}</main>
		</>
	);
}
