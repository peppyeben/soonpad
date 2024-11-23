import Image, { ImageProps } from "next/image";

export function NextOptimizedImage({ src, alt, ...rest }: ImageProps) {
	return (
		<Image
			src={src}
			alt={alt!}
			width={0}
			height={0}
			sizes="(100vw, 100vh)"
			{...rest}
		/>
	);
}
