"use client";

interface Props {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

const BlogTag = ({ tag, isSelected, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-[color,background-color,transform] cursor-pointer active:scale-95 ${
        isSelected
          ? "bg-primary text-white"
          : "bg-text/10 text-text hover:bg-text/20"
      }`}
    >
      {tag}
    </button>
  );
};

export default BlogTag;
