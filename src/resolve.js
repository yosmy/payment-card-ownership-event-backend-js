import React from "react";
import {ApproveOwnershipSuccessEventType, ApproveOwnershipSuccessEvent} from "./ApproveOwnershipSuccessEvent";
import {ProveOwnershipSuccessEventType, ProveOwnershipSuccessEvent} from "./ProveOwnershipSuccessEvent";
import {ProveOwnershipFailEventType, ProveOwnershipFailEvent} from "./ProveOwnershipFailEvent";
import {ExpireOwnershipSuccessEventType, ExpireOwnershipSuccessEvent} from "./ExpireOwnershipSuccessEvent";
import {InitOwnershipSuccessEventType, InitOwnershipSuccessEvent} from "./InitOwnershipSuccessEvent";
import {InitOwnershipFailEventType, InitOwnershipFailEvent} from "./InitOwnershipFailEvent";

const resolve = (labels) => {
    if (labels.includes(ProveOwnershipSuccessEventType)) {
        return ProveOwnershipSuccessEvent;
    }
    else if (labels.includes(ProveOwnershipFailEventType)) {
        return ProveOwnershipFailEvent;
    }
    else if (labels.includes(ExpireOwnershipSuccessEventType)) {
        return ExpireOwnershipSuccessEvent;
    }
    else if (labels.includes(InitOwnershipSuccessEventType)) {
        return InitOwnershipSuccessEvent;
    }
    else if (labels.includes(InitOwnershipFailEventType)) {
        return InitOwnershipFailEvent;
    }
    else if (labels.includes(ApproveOwnershipSuccessEventType)) {
        return ApproveOwnershipSuccessEvent;
    }

    return false;
};

export default resolve;