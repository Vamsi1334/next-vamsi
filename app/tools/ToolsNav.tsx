"use client";

import { tools } from "./toolsConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ToolsNav() {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {tools
        .filter((tool) => tool.path !== pathname)
        .map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="bg-blue-50 text-gray-800 font-semibold py-3 px-4 rounded-xl 
                      shadow-sm border border-gray-200 hover:bg-blue-100  
                      hover:scale-105 transition-transform
                      flex items-center gap-2"
          >
            <span className="text-lg">{tool.emoji}</span>
            <span>{tool.name}</span>
          </Link>
        ))}
    </div>
  );
}
