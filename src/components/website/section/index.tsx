import { ReactNode } from "react";

interface PageBackgroundWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageBackgroundWrapper = ({
  children,
  className = "",
}: PageBackgroundWrapperProps) => {
  return (
    <div
      className={`bg-gradient-to-br from-emerald-50 via-white to-amber-50 relative overflow-hidden ${className}`}
    >
      {/* Main Content */}
      {children}

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-300 rounded-full blur-3xl opacity-15 -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-amber-300 rounded-full blur-3xl opacity-15 -z-10 pointer-events-none" />
    </div>
  );
};

export default PageBackgroundWrapper;
