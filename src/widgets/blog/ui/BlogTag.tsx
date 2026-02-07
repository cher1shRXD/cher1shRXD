"use client";

interface Props {
  tag: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

const BlogTag = ({ tag, count, isSelected, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-[color,background-color,transform] cursor-pointer active:scale-95 flex items-center gap-1.5 ${
        isSelected
          ? "bg-primary text-white"
          : "bg-text/10 text-text hover:bg-text/20"
      }`}
    >
      <span>{tag}</span>
      <span
        className={`text-xs font-medium ${
          isSelected ? "text-white/80" : "text-text/60"
        }`}
      >
        ({count})
      </span>
    </button>
  );
};

export default BlogTag;
