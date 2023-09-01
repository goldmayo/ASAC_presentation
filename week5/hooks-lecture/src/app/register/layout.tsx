import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <section className="mt-10 px-4 py-2 border border-1 border-gray-800">{children}</section>;
}

export default layout;
