/* eslint-disable @typescript-eslint/no-unused-vars */
import { Events } from '../entity/events.js';
import { Activity } from '../vo/activity.js';
import { EventId } from '../vo/event.id.js';
import { Protocol } from '../vo/protocol.js';
import { EventParser } from './event-parser.js';

export class SplitEventParser extends EventParser {
  parseEvent(event: string): Events {
    const SEPARATOR = '' as const;
    const [_timestamp, _id, _protocol, _srcHost, _, _dstHost] = event.split(SEPARATOR);

    const id = EventId.of(_id);
    const timestamp = this.parseDate(_timestamp);
    const protocol = Protocol[_protocol];
    const activity = new Activity(_srcHost, _dstHost);

    return new Events(timestamp, id, protocol, activity);
  }
}
