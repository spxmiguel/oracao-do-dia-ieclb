import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return <main className="mx-auto min-h-screen w-full max-w-2xl px-4 pb-28 pt-6 sm:px-6 sm:pt-10">{children}</main>;
}
