import Image from 'next/image';
import BurgerButton from '../burgerButton';

export default function MobileHeader() {
	return (
		<div className="flex flex-row py-2 px-4 items-center justify-between md:hidden">
			<div className="flex flex-row items-center">
				<Image
					src="https://placehold.co/50x50.png"
					width={50}
					height={50}
					alt="icon"
				/>
				<span className="ml-2 font-bold text-lg"> name </span>
			</div>
			<BurgerButton />
		</div>
	);
}
