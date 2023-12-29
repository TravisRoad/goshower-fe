import { useMobile } from '@/lib/mobile';
import Search from './search';

export default async function SearchPage() {
	const isMobile = await useMobile();
	return <Search isMobile={isMobile} />;
}
