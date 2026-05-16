import React from "react";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`max-w-6xl w-full mx-auto lg:py-20 py-5 lg:px-0 px-2 md:px-2`}>
      {children}
    </main>
  );
};
