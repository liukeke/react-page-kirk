'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Page = require('./Page.jsx');

var _Page2 = _interopRequireDefault(_Page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = function (_Component) {
    _inherits(Entry, _Component);

    function Entry(props) {
        _classCallCheck(this, Entry);

        var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

        _this.state = {
            totalNum: 0,
            pageSize: 10,
            start: 0
        };
        return _this;
    }

    _createClass(Entry, [{
        key: 'getAjaxList',
        value: function getAjaxList(pageNum) {
            var _this2 = this;

            /*这里是ajax调用程序*/
            this.setState({ totalNum: 0 }, function () {
                _this2.setState({ totalNum: 400, start: pageNum });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getAjaxList(0, this.state.pageSize);
        }
    }, {
        key: 'render',
        value: function render() {
            var state = this.state;
            return _react2.default.createElement(
                'div',
                null,
                state.totalNum ? _react2.default.createElement(_Page2.default, { totalNum: state.totalNum, pageSize: state.pageSize, start: state.start, getAjaxList: this.getAjaxList.bind(this) }) : null
            );
        }
    }]);

    return Entry;
}(_react.Component);

exports.default = Entry;