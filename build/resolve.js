"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ApproveOwnershipSuccessEvent = require("./ApproveOwnershipSuccessEvent");

var _ProveOwnershipSuccessEvent = require("./ProveOwnershipSuccessEvent");

var _ProveOwnershipFailEvent = require("./ProveOwnershipFailEvent");

var _ExpireOwnershipSuccessEvent = require("./ExpireOwnershipSuccessEvent");

var _InitOwnershipSuccessEvent = require("./InitOwnershipSuccessEvent");

var _InitOwnershipFailEvent = require("./InitOwnershipFailEvent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolve = function resolve(labels) {
  if (labels.includes(_ProveOwnershipSuccessEvent.ProveOwnershipSuccessEventType)) {
    return _ProveOwnershipSuccessEvent.ProveOwnershipSuccessEvent;
  } else if (labels.includes(_ProveOwnershipFailEvent.ProveOwnershipFailEventType)) {
    return _ProveOwnershipFailEvent.ProveOwnershipFailEvent;
  } else if (labels.includes(_ExpireOwnershipSuccessEvent.ExpireOwnershipSuccessEventType)) {
    return _ExpireOwnershipSuccessEvent.ExpireOwnershipSuccessEvent;
  } else if (labels.includes(_InitOwnershipSuccessEvent.InitOwnershipSuccessEventType)) {
    return _InitOwnershipSuccessEvent.InitOwnershipSuccessEvent;
  } else if (labels.includes(_InitOwnershipFailEvent.InitOwnershipFailEventType)) {
    return _InitOwnershipFailEvent.InitOwnershipFailEvent;
  } else if (labels.includes(_ApproveOwnershipSuccessEvent.ApproveOwnershipSuccessEventType)) {
    return _ApproveOwnershipSuccessEvent.ApproveOwnershipSuccessEvent;
  }

  return false;
};

var _default = resolve;
exports["default"] = _default;