"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enrichInitOwnershipSuccessEvent = exports.InitOwnershipSuccessEventType = exports.InitOwnershipSuccessEvent = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ui = require("@yosmy/ui");

var _phone = require("@yosmy/phone");

var _money = _interopRequireDefault(require("@yosmy/money"));

var _event = require("@yosmy/event");

var _paymentBackend = require("@yosmy/payment-backend");

var _CommonEvent = require("./CommonEvent");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var type = "yosmy.payment.card.init_ownership_success";
exports.InitOwnershipSuccessEventType = type;

var InitOwnershipSuccessEvent = function InitOwnershipSuccessEvent(_ref) {
  var ui = _ref.ui,
      involved = _ref.involved,
      extra = _ref.extra,
      date = _ref.date,
      hide = _ref.hide,
      onSelectInvolved = _ref.onSelectInvolved;
  return /*#__PURE__*/_react["default"].createElement(ui.layout, {
    label: /*#__PURE__*/_react["default"].createElement(_ui.Text, null, "Se le cobr\xF3 al usuario para la verificaci\xF3n"),
    involved: [!hide.user && /*#__PURE__*/_react["default"].createElement(_event.EventInvolved, {
      label: "Usuario"
    }, typeof involved.user === "string" ? /*#__PURE__*/_react["default"].createElement(_phone.PhonePlaceholder, null) : /*#__PURE__*/_react["default"].createElement(_phone.Phone, {
      country: involved.user.country,
      prefix: involved.user.prefix,
      number: involved.user.number,
      onClick: function onClick() {
        onSelectInvolved("user", involved.user);
      }
    })), !hide.card && /*#__PURE__*/_react["default"].createElement(_event.EventInvolved, {
      label: "Tarjeta"
    }, /*#__PURE__*/_react["default"].createElement(_ui.CreditCard, {
      last4: involved.card.last4,
      onClick: function onClick() {
        onSelectInvolved("card", involved.card);
      }
    })), !hide.charge && /*#__PURE__*/_react["default"].createElement(_event.EventInvolved, {
      label: "Cobro"
    }, /*#__PURE__*/_react["default"].createElement(_ui.Text, null, involved.charge.amount && _money["default"].format(involved.charge.amount)))],
    extra: /*#__PURE__*/_react["default"].createElement(_ui.Json, null, extra),
    date: date
  });
};

exports.InitOwnershipSuccessEvent = InitOwnershipSuccessEvent;
InitOwnershipSuccessEvent.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired
  }).isRequired,
  involved: _propTypes["default"].shape({
    user: _phone.enrich.UserProp,
    card: _paymentBackend.enrich.CardProp,
    charge: _paymentBackend.enrich.ChargeProp
  }).isRequired,
  hide: _propTypes["default"].shape({
    user: _propTypes["default"].bool,
    card: _propTypes["default"].bool,
    charge: _propTypes["default"].bool
  }).isRequired,
  onSelectInvolved: _propTypes["default"].func.isRequired
};
InitOwnershipSuccessEvent.defaultProps = {
  hide: {
    user: false,
    card: false,
    charge: false
  }
};

var enrichInitOwnershipSuccessEvent = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(events, api) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _CommonEvent.enrichUsers)(events, api, type);

          case 2:
            events = _context.sent;
            _context.next = 5;
            return (0, _CommonEvent.enrichCards)(events, api, type);

          case 5:
            events = _context.sent;
            _context.next = 8;
            return (0, _CommonEvent.enrichCharges)(events, api, type);

          case 8:
            events = _context.sent;
            return _context.abrupt("return", events);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function enrichInitOwnershipSuccessEvent(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.enrichInitOwnershipSuccessEvent = enrichInitOwnershipSuccessEvent;