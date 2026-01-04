import { cn } from "@/lib/utils";

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
};

export const TypographyH1 = ({ children, className }: TypographyProps) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-balance",
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const TypographyH2 = ({ children, className }: TypographyProps) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const TypographyP = ({ children, className }: TypographyProps) => {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>;
};

export const TypographyLead = ({ children, className }: TypographyProps) => {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>;
};
