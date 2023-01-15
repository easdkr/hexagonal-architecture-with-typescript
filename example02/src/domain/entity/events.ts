import { RegexEventParser } from '../policy/regex.event-parser.js';
import { SplitEventParser } from '../policy/split.event-parser.js';
import { Activity } from '../vo/activity.js';
import { EventId } from '../vo/event.id.js';
import { ParsePolicyType } from '../vo/parse.policy.type.js';
import { Protocol } from '../vo/protocol.js';

export class Events {
  public constructor(private _timestamp: Date, private _id: EventId, private _protocol: Protocol, private _activity: Activity) {}

  toString(): string {
    return `Events{
      timestamp: ${this._timestamp}, 
      id: ${this._id.toString()},
      protocol: ${Protocol[this._protocol]},
      activity: ${this._activity.toString()}
    }`;
  }

  public static parsedEvent(unparsedEvent: string, policy: ParsePolicyType): Events {
    switch (policy) {
      case ParsePolicyType.REGEX:
        return new RegexEventParser().parseEvent(unparsedEvent);
      case ParsePolicyType.SPLIT:
        return new SplitEventParser().parseEvent(unparsedEvent);
      default:
        throw new Error('Illegal argument');
    }
  }
}
