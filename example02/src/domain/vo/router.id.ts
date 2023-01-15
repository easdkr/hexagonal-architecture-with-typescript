import { UUID } from '../../utils/uuid.js';

export class RouterId {
  constructor(private readonly _id: UUID) {}

  public static withId(id: string): RouterId {
    return new RouterId(UUID.fromString(id));
  }

  public static withoutId(): RouterId {
    return new RouterId(UUID.randomUUID());
  }

  toString(): string {
    return this._id.toString();
  }
}
