"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enrichCharges = exports.enrichCards = exports.enrichUsers = void 0;

var _phone = require("@yosmy/phone");

var _paymentBackend = require("@yosmy/payment-backend");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var enrichUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(events, api, type) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _phone.enrich.enrichUsers(events, // filter
            function (event) {
              return event.labels.includes(type);
            }, // pick
            function (event) {
              return event.involved.user;
            },
            /*#__PURE__*/
            // collect
            function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(users) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return api.collectPhones(users);

                      case 2:
                        return _context.abrupt("return", _context.sent);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }(), // enrich
            function (event, user) {
              return _objectSpread(_objectSpread({}, event), {}, {
                involved: _objectSpread(_objectSpread({}, event.involved), {}, {
                  user: user
                })
              });
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function enrichUsers(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.enrichUsers = enrichUsers;

var enrichCards = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(events, api, type) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _paymentBackend.enrich.enrichCards(events, // filter
            function (event) {
              return event.labels.includes(type);
            }, // pick
            function (event) {
              return event.involved.card;
            },
            /*#__PURE__*/
            // collect
            function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cards) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return api.collectCards(cards);

                      case 2:
                        return _context3.abrupt("return", _context3.sent);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x8) {
                return _ref4.apply(this, arguments);
              };
            }(), // enrich
            function (event, card) {
              return _objectSpread(_objectSpread({}, event), {}, {
                involved: _objectSpread(_objectSpread({}, event.involved), {}, {
                  card: card
                })
              });
            });

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function enrichCards(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.enrichCards = enrichCards;

var enrichCharges = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(events, api, type) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _paymentBackend.enrich.enrichCharges(events, // filter
            function (event) {
              return event.labels.includes(type);
            }, // pick
            function (event) {
              return event.involved.charge;
            },
            /*#__PURE__*/
            // collect
            function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(charges) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return api.collectCharges(charges);

                      case 2:
                        return _context5.abrupt("return", _context5.sent);

                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x12) {
                return _ref6.apply(this, arguments);
              };
            }(), // enrich
            function (event, charge) {
              return _objectSpread(_objectSpread({}, event), {}, {
                involved: _objectSpread(_objectSpread({}, event.involved), {}, {
                  charge: charge
                })
              });
            });

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function enrichCharges(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.enrichCharges = enrichCharges;