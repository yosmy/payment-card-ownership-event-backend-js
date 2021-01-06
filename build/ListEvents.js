"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _event = require("@yosmy/event");

var _enrich = _interopRequireDefault(require("./enrich"));

var _resolve = _interopRequireDefault(require("./resolve"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ListEvents = function ListEvents(_ref) {
  var ui = _ref.ui,
      api = _ref.api,
      criteria = _ref.criteria,
      onSelectUser = _ref.onSelectUser;
  return /*#__PURE__*/_react["default"].createElement(_event.ListEvents, {
    ui: {
      layout: ui.layout,
      item: function item(_ref2) {
        var labels = _ref2.labels,
            involved = _ref2.involved,
            extra = _ref2.extra,
            date = _ref2.date;

        var Component = (0, _resolve["default"])(labels) || _event.FallbackEvent;

        return /*#__PURE__*/_react["default"].createElement(Component, {
          ui: {
            layout: _event.EventLayout
          },
          labels: labels,
          involved: involved,
          extra: extra,
          date: date,
          onSelectInvolved: function onSelectInvolved(type, value) {
            if (type !== "user") {
              return;
            }

            onSelectUser(value.id);
          }
        });
      }
    },
    criteria: {
      query: criteria.query,
      limit: criteria.limit
    },
    onCollect: /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query, skip, limit) {
        var events;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return api.collectEvents(["yosmy.payment.card.init_ownership_success", "yosmy.payment.card.init_ownership_fail", "yosmy.payment.card.prove_ownership_success", "yosmy.payment.card.prove_ownership_fail", "yosmy.payment.card.approve_ownership_success", "yosmy.payment.card.expire_ownership_success"], {
                  user: query.user
                }, null, query.from, query.to, skip, limit);

              case 2:
                events = _context2.sent;

                if (!(events.length === 0)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  items: events
                });

              case 5:
                return _context2.abrupt("return", {
                  items: events,
                  onEnrich: function () {
                    var _onEnrich = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(events) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return (0, _enrich["default"])(events, {
                                collectPhones: api.collectPhones,
                                collectCards: api.collectCards,
                                collectCharges: api.collectCharges
                              });

                            case 2:
                              events = _context.sent;
                              return _context.abrupt("return", events);

                            case 4:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    function onEnrich(_x4) {
                      return _onEnrich.apply(this, arguments);
                    }

                    return onEnrich;
                  }()
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  });
};

ListEvents.propTypes = {
  ui: _propTypes["default"].shape({
    layout: _propTypes["default"].func.isRequired
  }).isRequired,
  api: _propTypes["default"].shape({
    collectEvents: _propTypes["default"].func.isRequired,
    collectPhones: _propTypes["default"].func.isRequired,
    collectCards: _propTypes["default"].func.isRequired,
    collectCharges: _propTypes["default"].func.isRequired
  }).isRequired,
  criteria: _propTypes["default"].shape({
    query: _propTypes["default"].shape({
      user: _propTypes["default"].string,
      from: _propTypes["default"].number,
      to: _propTypes["default"].number
    }).isRequired,
    limit: _propTypes["default"].number.isRequired
  }).isRequired,
  onSelectUser: _propTypes["default"].func.isRequired // (id)

};
var _default = ListEvents;
exports["default"] = _default;