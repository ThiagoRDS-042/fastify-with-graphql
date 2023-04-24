import { Replace } from "@shared/utils/replace";
import { BaseEntity } from "@configs/base-entity";

export type PostCategoryType =
  | "social"
  | "fashion"
  | "technology"
  | "games"
  | "nature";

export interface PostProps {
  title: string;
  content: string;
  description?: string | null;
  tag: string;
  authorId: string;
  isActive: boolean;
  category: PostCategoryType;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date | null;
}

export class Post extends BaseEntity<PostProps> {
  constructor(
    props: Replace<
      PostProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        publishedAt?: Date;
      }
    >,
    id?: string
  ) {
    super(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get title(): string {
    return this.props.title;
  }

  public set tag(tag: string) {
    this.props.tag = tag;
  }

  public get tag(): string {
    return this.props.tag;
  }

  public set authorId(authorId: string) {
    this.props.authorId = authorId;
  }

  public get authorId(): string {
    return this.props.authorId;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get content(): string {
    return this.props.content;
  }

  public active() {
    this.props.isActive = true;
  }

  public inactive() {
    this.props.isActive = false;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public set category(category: PostCategoryType) {
    this.props.category = category;
  }

  public get category(): PostCategoryType {
    return this.props.category;
  }

  public set description(description: string | null | undefined) {
    this.props.description = description;
  }

  public get description(): string | null | undefined {
    return this.props.description;
  }

  public get createdAt(): Date | null | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public publish() {
    this.props.publishedAt = new Date();
  }

  public deprive() {
    this.props.publishedAt = null;
  }

  public get publishedAt(): Date | null | undefined {
    return this.props.publishedAt;
  }

  public static newPost(props: PostProps, id?: string): Post {
    const post = new Post(props, id);

    return post;
  }
}
