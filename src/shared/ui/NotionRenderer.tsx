"use client";

import { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ExternalLink, Check, Square, Copy, CheckCheck } from "lucide-react";

type NotionBlockWithChildren = BlockObjectResponse & {
  children?: NotionBlockWithChildren[];
};

interface Props {
  blocks: NotionBlockWithChildren[];
}

const colorMap: Record<string, string> = {
  default: "text-text",
  gray: "text-text/60",
  brown: "text-amber-700 dark:text-amber-500",
  orange: "text-orange-600 dark:text-orange-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  green: "text-green-600 dark:text-green-400",
  blue: "text-blue-600 dark:text-blue-400",
  purple: "text-purple-600 dark:text-purple-400",
  pink: "text-pink-600 dark:text-pink-400",
  red: "text-red-600 dark:text-red-400",
  gray_background: "bg-gray-100 dark:bg-gray-800",
  brown_background: "bg-amber-100 dark:bg-amber-900/30",
  orange_background: "bg-orange-100 dark:bg-orange-900/30",
  yellow_background: "bg-yellow-100 dark:bg-yellow-900/30",
  green_background: "bg-green-100 dark:bg-green-900/30",
  blue_background: "bg-blue-100 dark:bg-blue-900/30",
  purple_background: "bg-purple-100 dark:bg-purple-900/30",
  pink_background: "bg-pink-100 dark:bg-pink-900/30",
  red_background: "bg-red-100 dark:bg-red-900/30",
};

const RichText = ({ richText }: { richText: RichTextItemResponse[] }) => {
  return (
    <>
      {richText.map((text, index) => {
        if (text.type === "text") {
          let className = "";
          const annotations = text.annotations;

          if (annotations.bold) className += " font-bold";
          if (annotations.italic) className += " italic";
          if (annotations.strikethrough) className += " line-through";
          if (annotations.underline) className += " underline";
          if (annotations.code) {
            className += " px-1.5 py-0.5 mx-0.5 rounded bg-surface text-primary font-mono text-sm";
          }
          if (annotations.color !== "default") {
            className += ` ${colorMap[annotations.color] || ""}`;
          }

          const content = text.text.link ? (
            <Link
              href={text.text.link.url}
              target="_blank"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              {text.text.content}
              <ExternalLink className="w-3 h-3" />
            </Link>
          ) : (
            text.text.content
          );

          return (
            <span key={index} className={className.trim()}>
              {content}
            </span>
          );
        }

        if (text.type === "mention") {
          if (text.mention.type === "date") {
            return (
              <span key={index} className="px-1.5 py-0.5 rounded bg-surface text-text/80 text-sm">
                {text.mention.date?.start}
                {text.mention.date?.end && ` → ${text.mention.date.end}`}
              </span>
            );
          }
          return <span key={index}>{text.plain_text}</span>;
        }

        if (text.type === "equation") {
          return (
            <span key={index} className="font-mono text-primary">
              {text.equation.expression}
            </span>
          );
        }

        return <span key={index}>{(text as RichTextItemResponse).plain_text}</span>;
      })}
    </>
  );
};

const CodeBlock = ({ block }: { block: Extract<BlockObjectResponse, { type: "code" }> }) => {
  const [copied, setCopied] = useState(false);
  const code = block.code.rich_text.map((t) => t.plain_text).join("");
  const language = block.code.language;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-surface/80 border border-border rounded-t-lg">
        <span className="text-xs text-text/60 font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="text-text/60 hover:text-text transition-colors"
          title="Copy code"
        >
          {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <pre className="p-4 bg-surface border border-t-0 border-border rounded-b-lg overflow-x-auto">
        <code className="text-sm font-mono text-text/90">{code}</code>
      </pre>
      {block.code.caption.length > 0 && (
        <p className="mt-1 text-sm text-text/60">
          <RichText richText={block.code.caption} />
        </p>
      )}
    </div>
  );
};

const ToggleBlock = ({
  block,
  childBlocks,
}: {
  block: Extract<BlockObjectResponse, { type: "toggle" }>;
  childBlocks?: NotionBlockWithChildren[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left hover:bg-surface/50 rounded p-1 -ml-1"
      >
        <ChevronRight
          className={`w-4 h-4 text-text/60 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
        <span className={colorMap[block.toggle.color] || ""}>
          <RichText richText={block.toggle.rich_text} />
        </span>
      </button>
      {isOpen && childBlocks && (
        <div className="ml-6 mt-1">
          <NotionRenderer blocks={childBlocks} />
        </div>
      )}
    </div>
  );
};


const BlockRenderer = ({ block }: { block: NotionBlockWithChildren }) => {
  switch (block.type) {
    case "paragraph": {
      if (block.paragraph.rich_text.length === 0) {
        return <div className="h-4" />;
      }
      return (
        <p className={`my-2 leading-relaxed ${colorMap[block.paragraph.color] || ""}`}>
          <RichText richText={block.paragraph.rich_text} />
        </p>
      );
    }

    case "heading_1": {
      const HeadingContent = (
        <h1
          className={`text-2xl sm:text-3xl font-bold font-playpen mt-8 mb-4 ${colorMap[block.heading_1.color] || ""}`}
        >
          <RichText richText={block.heading_1.rich_text} />
        </h1>
      );

      if (block.heading_1.is_toggleable) {
        return (
          <ToggleBlock
            block={{ ...block, type: "toggle", toggle: { rich_text: block.heading_1.rich_text, color: block.heading_1.color, children: [] } } as Extract<BlockObjectResponse, { type: "toggle" }>}
            childBlocks={block.children}
          />
        );
      }

      return HeadingContent;
    }

    case "heading_2": {
      const HeadingContent = (
        <h2
          className={`text-xl sm:text-2xl font-bold font-playpen mt-6 mb-3 ${colorMap[block.heading_2.color] || ""}`}
        >
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

      if (block.heading_2.is_toggleable) {
        return (
          <ToggleBlock
            block={{ ...block, type: "toggle", toggle: { rich_text: block.heading_2.rich_text, color: block.heading_2.color, children: [] } } as Extract<BlockObjectResponse, { type: "toggle" }>}
            childBlocks={block.children}
          />
        );
      }

      return HeadingContent;
    }

    case "heading_3": {
      const HeadingContent = (
        <h3
          className={`text-lg sm:text-xl font-bold font-playpen mt-4 mb-2 ${colorMap[block.heading_3.color] || ""}`}
        >
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

      if (block.heading_3.is_toggleable) {
        return (
          <ToggleBlock
            block={{ ...block, type: "toggle", toggle: { rich_text: block.heading_3.rich_text, color: block.heading_3.color, children: [] } } as Extract<BlockObjectResponse, { type: "toggle" }>}
            childBlocks={block.children}
          />
        );
      }

      return HeadingContent;
    }

    case "bulleted_list_item": {
      return (
        <li className={`ml-4 my-1 list-disc ${colorMap[block.bulleted_list_item.color] || ""}`}>
          <RichText richText={block.bulleted_list_item.rich_text} />
          {block.children && block.children.length > 0 && (
            <ul className="mt-1">
              <NotionRenderer blocks={block.children} />
            </ul>
          )}
        </li>
      );
    }

    case "numbered_list_item": {
      return (
        <li className={`ml-4 my-1 list-decimal ${colorMap[block.numbered_list_item.color] || ""}`}>
          <RichText richText={block.numbered_list_item.rich_text} />
          {block.children && block.children.length > 0 && (
            <ol className="mt-1">
              <NotionRenderer blocks={block.children} />
            </ol>
          )}
        </li>
      );
    }

    case "to_do": {
      return (
        <div className={`flex items-start gap-2 my-1 ${colorMap[block.to_do.color] || ""}`}>
          {block.to_do.checked ? (
            <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
          ) : (
            <Square className="w-5 h-5 text-text/40 mt-0.5 shrink-0" />
          )}
          <span className={block.to_do.checked ? "line-through text-text/60" : ""}>
            <RichText richText={block.to_do.rich_text} />
          </span>
        </div>
      );
    }

    case "toggle": {
      return <ToggleBlock block={block} childBlocks={block.children} />;
    }

    case "code": {
      return <CodeBlock block={block} />;
    }

    case "quote": {
      return (
        <blockquote
          className={`border-l-4 border-primary pl-4 my-4 italic ${colorMap[block.quote.color] || ""}`}
        >
          <RichText richText={block.quote.rich_text} />
          {block.children && block.children.length > 0 && (
            <div className="mt-2 not-italic">
              <NotionRenderer blocks={block.children} />
            </div>
          )}
        </blockquote>
      );
    }

    case "callout": {
      const icon = block.callout.icon;
      const emoji = icon?.type === "emoji" ? icon.emoji : "💡";

      return (
        <div
          className={`flex gap-3 p-4 my-4 rounded-lg border border-border ${
            colorMap[block.callout.color] || "bg-surface/50"
          }`}
        >
          <span className="text-xl shrink-0">{emoji}</span>
          <div className="flex-1">
            <RichText richText={block.callout.rich_text} />
          </div>
        </div>
      );
    }

    case "divider": {
      return <hr className="my-6 border-border" />;
    }

    case "image": {
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.type === "file"
          ? block.image.file.url
          : null;

      if (!imageUrl) return null;

      return (
        <figure className="my-6">
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={block.image.caption?.map((c) => c.plain_text).join("") || "Image"}
              width={800}
              height={400}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
          {block.image.caption && block.image.caption.length > 0 && (
            <figcaption className="mt-2 text-center text-sm text-text/60">
              <RichText richText={block.image.caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoUrl =
        block.video.type === "external"
          ? block.video.external.url
          : block.video.type === "file"
          ? block.video.file.url
          : null;

      if (!videoUrl) return null;

      const youtubeMatch = videoUrl.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
      );

      if (youtubeMatch) {
        return (
          <div className="my-6 aspect-video rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeMatch[1]}`}
              className="w-full h-full"
              allowFullScreen
              title="YouTube video"
            />
          </div>
        );
      }

      return (
        <video controls className="w-full my-6 rounded-lg">
          <source src={videoUrl} />
        </video>
      );
    }

    case "embed": {
      return (
        <div className="my-6">
          <iframe
            src={block.embed.url}
            className="w-full aspect-video rounded-lg border border-border"
            allowFullScreen
          />
        </div>
      );
    }

    case "bookmark": {
      return (
        <Link
          href={block.bookmark.url}
          target="_blank"
          className="flex items-center gap-3 p-4 my-4 border border-border rounded-lg hover:border-primary transition-colors group"
        >
          <ExternalLink className="w-5 h-5 text-text/60 group-hover:text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-text truncate">{block.bookmark.url}</p>
            {block.bookmark.caption.length > 0 && (
              <p className="text-sm text-text/60 mt-1">
                <RichText richText={block.bookmark.caption} />
              </p>
            )}
          </div>
        </Link>
      );
    }

    case "table": {
      return (
        <div className="my-6 overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
            {block.children && (
              <tbody>
                {block.children.map((row, rowIndex) => {
                  if (row.type !== "table_row") return null;

                  return (
                    <tr
                      key={row.id}
                      className={rowIndex === 0 && block.table.has_column_header ? "bg-surface" : ""}
                    >
                      {row.table_row.cells.map((cell, cellIndex) => {
                        const isHeaderCell =
                          (block.table.has_column_header && rowIndex === 0) ||
                          (block.table.has_row_header && cellIndex === 0);

                        const CellTag = isHeaderCell ? "th" : "td";

                        return (
                          <CellTag
                            key={cellIndex}
                            className={`border border-border px-4 py-2 text-left ${
                              isHeaderCell ? "font-semibold bg-surface" : ""
                            }`}
                          >
                            <RichText richText={cell} />
                          </CellTag>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      );
    }

    case "column_list": {
      return (
        <div className="flex flex-col md:flex-row gap-4 my-4">
          {block.children?.map((column) => (
            <div key={column.id} className="flex-1">
              {column.children && <NotionRenderer blocks={column.children} />}
            </div>
          ))}
        </div>
      );
    }

    case "equation": {
      return (
        <div className="my-4 p-4 bg-surface rounded-lg text-center font-mono text-lg">
          {block.equation.expression}
        </div>
      );
    }

    case "file": {
      const fileUrl =
        block.file.type === "external"
          ? block.file.external.url
          : block.file.type === "file"
          ? block.file.file.url
          : null;

      if (!fileUrl) return null;

      return (
        <Link
          href={fileUrl}
          target="_blank"
          className="flex items-center gap-2 p-3 my-2 border border-border rounded-lg hover:border-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>{block.file.name || "Download file"}</span>
        </Link>
      );
    }

    case "pdf": {
      const pdfUrl =
        block.pdf.type === "external"
          ? block.pdf.external.url
          : block.pdf.type === "file"
          ? block.pdf.file.url
          : null;

      if (!pdfUrl) return null;

      return (
        <div className="my-6">
          <iframe src={pdfUrl} className="w-full h-150 rounded-lg border border-border" />
        </div>
      );
    }

    case "audio": {
      const audioUrl =
        block.audio.type === "external"
          ? block.audio.external.url
          : block.audio.type === "file"
          ? block.audio.file.url
          : null;

      if (!audioUrl) return null;

      return (
        <audio controls className="w-full my-4">
          <source src={audioUrl} />
        </audio>
      );
    }

    case "synced_block": {
      if (block.children) {
        return <NotionRenderer blocks={block.children} />;
      }
      return null;
    }

    case "child_page": {
      return (
        <div className="p-3 my-2 border border-border rounded-lg hover:border-primary transition-colors">
          <span className="text-lg">📄 {block.child_page.title}</span>
        </div>
      );
    }

    case "child_database": {
      return (
        <div className="p-3 my-2 border border-border rounded-lg hover:border-primary transition-colors">
          <span className="text-lg">📊 {block.child_database.title}</span>
        </div>
      );
    }

    case "table_of_contents": {
      return (
        <div className={`my-4 p-4 bg-surface rounded-lg ${colorMap[block.table_of_contents.color] || ""}`}>
          <p className="text-text/60 text-sm">Table of Contents</p>
        </div>
      );
    }

    case "breadcrumb": {
      return <div className="my-2 text-text/60 text-sm">Breadcrumb</div>;
    }

    case "link_preview": {
      return (
        <Link
          href={block.link_preview.url}
          target="_blank"
          className="flex items-center gap-2 p-3 my-2 border border-border rounded-lg hover:border-primary transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="truncate">{block.link_preview.url}</span>
        </Link>
      );
    }

    default: {
      return (
        <div className="my-2 p-2 bg-surface/50 rounded text-text/60 text-sm">
          Unsupported block type: {(block as BlockObjectResponse).type}
        </div>
      );
    }
  }
};

// Group consecutive list items
const groupListItems = (blocks: NotionBlockWithChildren[]): NotionBlockWithChildren[][] => {
  const groups: NotionBlockWithChildren[][] = [];
  let currentGroup: NotionBlockWithChildren[] = [];
  let currentType: string | null = null;

  for (const block of blocks) {
    const isBulleted = block.type === "bulleted_list_item";
    const isNumbered = block.type === "numbered_list_item";

    if (isBulleted || isNumbered) {
      if (currentType === block.type) {
        currentGroup.push(block);
      } else {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [block];
        currentType = block.type;
      }
    } else {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
        currentGroup = [];
        currentType = null;
      }
      groups.push([block]);
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
};

const NotionRenderer = ({ blocks }: Props) => {
  const groups = groupListItems(blocks);

  return (
    <div className="notion-content">
      {groups.map((group, groupIndex) => {
        const firstBlock = group[0];

        if (firstBlock.type === "bulleted_list_item") {
          return (
            <ul key={groupIndex} className="my-2">
              {group.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ul>
          );
        }

        if (firstBlock.type === "numbered_list_item") {
          return (
            <ol key={groupIndex} className="my-2">
              {group.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </ol>
          );
        }

        return group.map((block) => <BlockRenderer key={block.id} block={block} />);
      })}
    </div>
  );
};

export default NotionRenderer;