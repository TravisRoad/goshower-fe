import Summary from '@/components/summary';
import { redirectToLogin } from '@/lib/auth';

const Action = () => {
	return (
		<div className="w-full p-4 flex-col flex">
			<div className="grid grid-cols-2 space-x-4">
				<button className="border p-2 rounded-md">add a record</button>
				<button className="border p-2 rounded-md">add a media</button>
			</div>
		</div>
	);
};

export default async function Home() {
	await redirectToLogin();
	return (
		<>
			<div></div>
			<Summary />
			<Action />
		</>
	);
}
