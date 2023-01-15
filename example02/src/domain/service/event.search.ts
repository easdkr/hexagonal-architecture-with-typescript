import { Events } from '../entity/events.js';
import { ParsePolicyType } from '../vo/parse.policy.type.js';

export class EventSearch {
  public retrieveEvents(unparseEvents: string[], policyType: ParsePolicyType): Events[] {
    return unparseEvents.map((e) => Events.parsedEvent(e, policyType));
  }
}
