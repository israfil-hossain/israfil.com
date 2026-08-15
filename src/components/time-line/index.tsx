import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../portable-text";

interface TimelineDemoProps {
  experiences?: any[];
}

export function TimelineDemo({ experiences = [] }: TimelineDemoProps) {
  if (experiences.length === 0) {
    return null;
  }

  const data = experiences.map((exp: any) => ({
    title: exp.year,
    content: (
      <div>
        {(exp.companyName || exp.location) && (
          <div className="mb-3 text-xs md:text-sm">
            {exp.companyName && (
              <span className="font-semibold text-neutral-800">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline hover:text-blue-600 transition-colors"
                  >
                    {exp.companyName}
                  </a>
                ) : (
                  exp.companyName
                )}
              </span>
            )}
            {exp.location && (
              <span className="text-neutral-500 ml-2">
                · {exp.location}
              </span>
            )}
          </div>
        )}
        {exp.description && Array.isArray(exp.description) && exp.description.length > 0 ? (
          <div className="text-xs font-normal text-neutral-800 md:text-sm">
            <PortableText value={exp.description} components={portableTextComponents} />
          </div>
        ) : null}
      </div>
    ),
  }));

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
