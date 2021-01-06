import {enrichApproveOwnershipSuccessEvent} from "./ApproveOwnershipSuccessEvent";
import {enrichProveOwnershipFailEvent} from "./ProveOwnershipFailEvent";
import {enrichProveOwnershipSuccessEvent} from "./ProveOwnershipSuccessEvent";
import {enrichExpireOwnershipSuccessEvent} from "./ExpireOwnershipSuccessEvent";
import {enrichInitOwnershipFailEvent} from "./InitOwnershipFailEvent";
import {enrichInitOwnershipSuccessEvent} from "./InitOwnershipSuccessEvent";

const enrich = async (events, api) => {
    events = await enrichInitOwnershipSuccessEvent(
        events,
        {
            collectPhones: api.collectPhones,
            collectCards: api.collectCards,
            collectCharges: api.collectCharges
        }
    );

    events = await enrichInitOwnershipFailEvent(
        events,
        {
            collectPhones: api.collectPhones,
            collectCards: api.collectCards,
        }
    );

    events = await enrichProveOwnershipSuccessEvent(
        events,
        {
            collectPhones: api.collectPhones,
            collectCards: api.collectCards,
        }
    );

    events = await enrichProveOwnershipFailEvent(
        events,
        {
            collectPhones: api.collectPhones,
            collectCards: api.collectCards,
        }
    );

    events = await enrichExpireOwnershipSuccessEvent(
        events,
        {
            collectPhones: api.collectPhones,
            collectCards: api.collectCards,
        }
    );

    events = await enrichApproveOwnershipSuccessEvent(
        events,
        {
            collectPhones: api.collectPhones,
            collectCards: api.collectCards,
        }
    );

    return events;
};

export default enrich;