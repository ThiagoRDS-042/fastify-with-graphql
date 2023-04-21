import { Post } from "@modules/posts/entities/post.entity";
import {
  IOptions,
  PostsRepository,
} from "@modules/posts/repositories/posts-repository";

export class InMemoryPostsRepository implements PostsRepository {
  public posts: Post[] = [];

  public async create(post: Post): Promise<void> {
    this.posts.push(post);
  }

  public async save(post: Post): Promise<void> {
    const postIndex = this.posts.findIndex((item) => item.id === post.id);

    if (postIndex >= 0) {
      this.posts[postIndex] = post;
    }
  }

  public async publish(postId: string): Promise<void> {
    const postIndex = this.posts.findIndex((item) => item.id === postId);

    if (postIndex >= 0) {
      this.posts[postIndex].publish();
    }
  }

  public async deprive(postId: string): Promise<void> {
    const postIndex = this.posts.findIndex((item) => item.id === postId);

    if (postIndex >= 0) {
      this.posts[postIndex].deprive();
    }
  }

  public async findById(postId: string): Promise<Post | null> {
    const post = this.posts.find((item) => item.id === postId);

    if (!post) {
      return null;
    }

    return post;
  }

  public async findByTag(tag: string): Promise<Post | null> {
    const post = this.posts.find((item) => item.tag === tag);

    if (!post) {
      return null;
    }

    return post;
  }

  public async findMany(options?: IOptions): Promise<Post[]> {
    const {
      authorIdEquals,
      categoryEquals,
      publish,
      tagEquals,
      titleContains,
    } = options;

    let posts = this.posts;

    if (authorIdEquals) {
      posts = posts.filter((item) => item.authorId === authorIdEquals);
    }

    if (categoryEquals) {
      posts = posts.filter((item) => item.category === categoryEquals);
    }

    if (tagEquals) {
      posts = posts.filter((item) => item.tag === tagEquals);
    }

    if (titleContains) {
      posts = posts.filter((item) =>
        item.title
          .toLocaleUpperCase()
          .includes(titleContains.toLocaleUpperCase())
      );
    }

    if (publish !== undefined && publish === true) {
      posts = posts.filter((item) => !!item.publishedAt);
    }

    if (publish !== undefined && publish === false) {
      posts = posts.filter((item) => !item.publishedAt);
    }

    return posts;
  }
}
