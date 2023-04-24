import { Replace } from "@shared/utils/replace";
import { BaseEntity } from "@configs/base-entity";

export interface AuthorProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Author extends BaseEntity<AuthorProps> {
  constructor(
    props: Replace<
      AuthorProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
      }
    >,
    id?: string
  ) {
    super(props, id);
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get createdAt(): Date | null | undefined {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public delete() {
    this.props.deletedAt = new Date();
  }

  public active() {
    this.props.deletedAt = null;
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public static newAuthor(props: AuthorProps, id?: string): Author {
    const author = new Author(props, id);

    return author;
  }
}
