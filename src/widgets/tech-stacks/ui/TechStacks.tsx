"use client";

import { TechStack } from "@/entities/tech-stacks/types";
import CategoryContainer from "./CategoryContainer";
import { useActiveByScroll } from "../hooks/useActiveByScroll";

interface Props {
  data: TechStack[];
}

const TechStacks = ({ data }: Props) => {
  const mappedByCategory = data.reduce(
    (acc, techStack) => {
      if (!acc[techStack.category.select.name]) {
        acc[techStack.category.select.name] = [];
      }
      acc[techStack.category.select.name].push(techStack);
      return acc;
    },
    {} as Record<string, TechStack[]>,
  );

  const categories = ["Frontend", "Tools", "Backend", "Database"];
  const { wrapperRef, activeIndex } = useActiveByScroll(categories);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <div className="sticky top-50 flex items-start justify-start gap-8">
        {categories.map((category, index) => (
          <CategoryContainer
            key={category}
            isActive={index <= activeIndex}
            items={mappedByCategory[category]}
            name={category}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStacks;
