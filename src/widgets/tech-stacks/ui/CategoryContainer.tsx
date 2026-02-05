"use client";

import { TechStack } from "@/entities/tech-stacks/types";
import { motion } from "framer-motion";
import { getLevelCount } from "../utils/get-level-count";

interface Props {
  isActive: boolean;
  name: string;
  items: TechStack[];
}

const CategoryContainer = ({ isActive, name, items }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.5 }}
      className={`flex-1 rounded-4xl p-8 flex flex-col gap-6 transition-colors duration-500 ${
        isActive ? "bg-primary/20 border-2 border-primary" : "bg-surface border-2 border-border"
      }`}>
      <h3 className="text-3xl font-bold font-playpen tracking-wider text-primary">
        {name}
      </h3>
      
      <div className="flex flex-col gap-3 overflow-y-auto">
        {items?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isActive ? 1 : 0.5,
              x: isActive ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              delay: isActive ? index * 0.05 : 0,
            }}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              isActive ? "bg-surface/80" : "bg-surface/40"
            }`}>
            <span className="text-lg font-medium">
              {item.name.title[0].plain_text}
            </span>
            
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < getLevelCount(item.level.status.name)
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryContainer;