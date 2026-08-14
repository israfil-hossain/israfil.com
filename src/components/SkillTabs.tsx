"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SkillCategory, Skill } from "@/store/type/ProfileData";
import { twMerge } from "tailwind-merge";

interface SkillTabsProps {
  categories: SkillCategory[];
  skills: Skill[];
}

export const SkillTabs = ({ categories, skills }: SkillTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    categories[0]?._id || ""
  );

  const filteredSkills = skills.filter(
    (skill) => skill.category?._id === activeTab
  );

  if (!categories.length) return null;

  return (
    <div className="mt-5">
      <h2 className="font-black text-lg mb-4">Skills</h2>

      {/* Tab Bar */}
      <div className="flex gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActiveTab(cat._id)}
            className={twMerge(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
              activeTab === cat._id
                ? "bg-slate-900 text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            )}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Skill Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        >
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15, delay: idx * 0.03 }}
              className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-xl px-3 py-2.5 hover:border-blue-300 hover:shadow-sm transition-all duration-200"
            >
              {skill.icon ? (
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={24}
                  height={24}
                  className="rounded-sm object-contain flex-shrink-0"
                />
              ) : (
                <div className="w-6 h-6 rounded-sm bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-slate-500">
                    {skill.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-sm font-medium text-gray-800 truncate">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredSkills.length === 0 && (
        <p className="text-sm text-gray-400 mt-2">
          No skills in this category yet.
        </p>
      )}
    </div>
  );
};
