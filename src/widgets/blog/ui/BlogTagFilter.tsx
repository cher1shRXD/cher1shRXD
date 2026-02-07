import BlogTag from "./BlogTag";

interface Props {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const BlogTagFilter = ({ tags, selectedTag, onTagSelect }: Props) => {
  return (
    <div className="max-w-xl flex items-start gap-2 flex-wrap">
      <BlogTag
        tag="전체"
        isSelected={!selectedTag}
        onClick={() => onTagSelect(null)}
      />
      {tags.map((tag) => (
        <BlogTag
          key={tag}
          tag={tag}
          isSelected={selectedTag === tag}
          onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
        />
      ))}
    </div>
  );
};

export default BlogTagFilter;
