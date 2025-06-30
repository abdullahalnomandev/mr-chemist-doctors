export const SectionTitle = ({ title, className = "" }: { title: string; className?: string }) => (
  <h2 className={`mb-1 text-2xl font-semibold ${className}`}>{title}</h2>
);

export const SectionDescription = ({ description, className = "" }: { description: string; className?: string }) => (
  <p className={`text-sm mx-auto max-w-lg ${className}`}>{description}</p>
);
