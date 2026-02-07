import BlogTag from "./BlogTag";

interface Props {
  tags: string[];
  tagCounts: Record<string, number>;
  totalCount: number;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const BlogTagFilter = ({ tags, tagCounts, totalCount, selectedTag, onTagSelect }: Props) => {
  return (
    <div className="max-w-xl flex items-start gap-2 flex-wrap">
      <BlogTag
        tag="전체"
        count={totalCount}
        isSelected={!selectedTag}
        onClick={() => onTagSelect(null)}
      />
      {tags.map((tag) => (
        <BlogTag
          key={tag}
          tag={tag}
          count={tagCounts[tag] || 0}
          isSelected={selectedTag === tag}
          onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
        />
      ))}
    </div>
  );
};

export default BlogTagFilter;
