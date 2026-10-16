/** Decorative stock photograph in the same clipped, parallax frame used by project media. */
export default function Photo({
  src,
  alt,
  className = "",
  position = "center",
}: {
  src: string;
  alt: string;
  /** Frame sizing: aspect ratio, grid span, visibility. */
  className?: string;
  position?: string;
}) {
  return (
    <div data-clip className={`media-frame ${className}`}>
      <div className="h-full">
        <img
          data-parallax
          src={src}
          alt={alt}
          width={1400}
          height={933}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: position, filter: "saturate(0.55) contrast(1.05)" }}
        />
      </div>
    </div>
  );
}
