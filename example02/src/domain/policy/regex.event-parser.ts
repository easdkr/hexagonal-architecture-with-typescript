import { Events } from '../entity/events.js';
import { Activity } from '../vo/activity.js';
import { EventId } from '../vo/event.id.js';
import { Protocol } from '../vo/protocol.js';
import { EventParser } from './event-parser.js';

export class RegexEventParser extends EventParser {
  parseEvent(event: string): Events {
    const regex = /(\\"[^\\"]+\\")|\S+/g; // 공백 기준으로 자르기

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_timestamp, _id, _protocol, _srcHost, _, _dstHost] = event.match(regex);

    const id = EventId.of(_id);
    const timestamp = this.parseDate(_timestamp);
    const protocol = Protocol[_protocol];
    const activity = new Activity(_srcHost, _dstHost);

    return new Events(timestamp, id, protocol, activity);
  }
}
