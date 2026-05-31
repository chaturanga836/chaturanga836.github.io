interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  centered?: boolean;
  subtitle?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  centered = true,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="text-sm font-mono text-primary mb-4">{eyebrow}</h2>
      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        {highlight ? (
          <>
            {title}{" "}
            <span className="text-gradient">{highlight}</span>
          </>
        ) : (
          title
        )}
      </h3>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">{subtitle}</p>
      )}
    </div>
  );
}
