import {
  CreatedAt,
  Url,
  Status,
  UpdatedAt,
  Name,
  MultiSelect,
  Number,
} from "@/shared/types/fields";

export interface BlogPost {
  github_repo: Url | null;
  status: Status;
  updated_at: UpdatedAt;
  created_at: CreatedAt;
  tags: MultiSelect;
  slug: Number;
  name: Name;
}
