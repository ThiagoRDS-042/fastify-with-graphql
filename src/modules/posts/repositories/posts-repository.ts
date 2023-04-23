import { Post, PostCategoryType } from "../entities/post.entity";

export interface IOptions {
  titleContains?: string;
  tagEquals?: string;
  categoryEquals?: PostCategoryType;
  publish?: boolean;
  authorIdEquals?: string;
}

export interface PostsRepository {
  create(post: Post): Promise<void>;
  save(post: Post): Promise<void>;
  findById(postId: string): Promise<Post | null>;
  findByTag(tag: string): Promise<Post | null>;
  findMany(options?: IOptions): Promise<Post[]>;
}
