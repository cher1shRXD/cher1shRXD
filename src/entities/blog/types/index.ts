import {
  CreatedAt,
  Url,
  Status,
  UpdatedAt,
  Name,
  MultiSelect,
  Number,
  File,
  Checkbox,
} from "@/shared/types/fields";

export interface BlogPost {
  github_repo: Url | null;
  status: Status;
  updated_at: UpdatedAt;
  created_at: CreatedAt;
  tags: MultiSelect;
  name: Name;
  thumbnail: File | null;
  email_sent: Checkbox;
  sort: Number;
}
