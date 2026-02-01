interface StartupCardProps {
	name: string;
	description: string;
}

export function StartupCard(props: StartupCardProps) {
	return (
		<div className="flex items-center justify-center bg-card h-full rounded-2xl">
			<p className="text-lg font-semibold">{props.name}</p>
			<p className="text-sm text-muted-foreground">{props.description}</p>
		</div>
	);
}
