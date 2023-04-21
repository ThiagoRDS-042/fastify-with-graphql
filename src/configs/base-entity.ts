import { randomUUID } from "node:crypto";

export abstract class BaseEntity<T> {
  protected _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }
}
