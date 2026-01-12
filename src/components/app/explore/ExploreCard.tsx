import { Link, type LinkProps } from "@tanstack/react-router";

type ExploreCardProps = LinkProps & {
	title: string;
	image: string;
};

export function ExploreCard({ title, image, to }: ExploreCardProps) {
	return (
		<Link
			to={to}
			className="group w-full max-w-md h-80 rounded-2xl bg-card border
                        flex flex-col items-center justify-center gap-6
                        transition-all duration-300 ease-out
                        hover:-translate-y-2 hover:shadow-xl hover:border-primary
                    "
		>
			<img
				src={image}
				alt=""
				className="w-48 md:w-64 transition-transform duration-300 group-hover:scale-105"
			/>
			<p className="text-xl font-medium">{title}</p>
		</Link>
	);
}
