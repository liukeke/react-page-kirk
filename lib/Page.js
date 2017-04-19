'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./page.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * demo
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start} getAjaxList={this.getAjaxList.bind(this)}/>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */

var pageOn = function pageOn(_pageOn) {
    window.location.hash = 'pageOn=' + _pageOn;
};

var Entry = function (_Component) {
    _inherits(Entry, _Component);

    function Entry(props) {
        _classCallCheck(this, Entry);

        var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, props));

        _this.state = {
            totalNum: _this.props.totalNum,
            pageSize: _this.props.pageSize,
            start: _this.props.start,
            pagePrev: false,
            pageNext: false
        };
        return _this;
    }

    _createClass(Entry, [{
        key: 'handlePagePrevOrpageNextOnclick',
        value: function handlePagePrevOrpageNextOnclick(type) {

            var pageSize = this.state.pageSize;
            var pageNumOn = document.getElementsByClassName("page")[0].getElementsByClassName("on")[0].innerText;
            if (type == 1) {
                this.props.getAjaxList(pageNumOn * pageSize, pageNumOn * pageSize + pageSize);
                /*console.log(parseInt(pageNumOn)+1);*/
                pageOn(parseInt(pageNumOn) + 1);
            } else {
                this.props.getAjaxList((pageNumOn - 1) * pageSize - pageSize, (pageNumOn - 1) * pageSize);
                /*console.log(parseInt(pageNumOn)-1)*/
                pageOn(parseInt(pageNumOn) - 1);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var state = this.state;
            var num = Math.ceil(state.totalNum / state.pageSize);
            var pageNumOn = state.start / state.pageSize + 1;
            /*判断是否有下一页*/
            if (num > 1) {
                this.setState({ pageNext: true });
            }
            if (num == pageNumOn) {
                this.setState({ pageNext: false });
            }
            /*判断是否有上一页*/
            if (pageNumOn > 1) {
                this.setState({ pagePrev: true });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var THIS = this;
            var state = this.state;
            var totalNum = state.totalNum;
            var start = state.start;
            var pageSize = state.pageSize;
            var num = Math.ceil(totalNum / pageSize);
            var numArray = [];
            var pageNumOn = start / pageSize + 1;
            if (num <= pageSize) {
                for (var i = 1; i <= num; i++) {
                    numArray.push(i);
                }
            }
            if (num > pageSize) {
                var kkk = parseInt(pageNumOn) + pageSize / 2 - 1;
                for (var i = 1; i <= pageSize; i++) {
                    numArray.push(i);
                }
                if (kkk > pageSize) {
                    numArray = [];
                    if (kkk <= num) {
                        for (var i = kkk - pageSize + 1; i <= kkk; i++) {
                            numArray.push(i);
                        }
                    }
                    if (kkk > num) {
                        for (var i = num - pageSize + 1; i <= num; i++) {
                            numArray.push(i);
                        }
                    }
                }
            }
            var item = numArray.map(function (data, index) {
                return _react2.default.createElement(PageItem, { key: data, pageNum: data, pageSize: pageSize, start: start,
                    getAjaxList: THIS.props.getAjaxList });
            });
            return _react2.default.createElement(
                'div',
                { className: 'page' },
                _react2.default.createElement(
                    'a',
                    { className: state.pagePrev ? "butGray" : "PrevNextNo", href: 'javascript:;',
                        onClick: state.pagePrev ? this.handlePagePrevOrpageNextOnclick.bind(this, 0) : null },
                    '\u4E0A\u4E00\u9875'
                ),
                item,
                _react2.default.createElement(
                    'a',
                    { className: state.pageNext ? "butGray" : "PrevNextNo", href: 'javascript:;',
                        onClick: state.pageNext ? this.handlePagePrevOrpageNextOnclick.bind(this, 1) : null },
                    '\u4E0B\u4E00\u9875'
                )
            );
        }
    }]);

    return Entry;
}(_react.Component);

var PageItem = function (_Component2) {
    _inherits(PageItem, _Component2);

    function PageItem(props) {
        _classCallCheck(this, PageItem);

        var _this2 = _possibleConstructorReturn(this, (PageItem.__proto__ || Object.getPrototypeOf(PageItem)).call(this, props));

        _this2.state = {
            start: _this2.props.start
        };
        return _this2;
    }

    _createClass(PageItem, [{
        key: 'handlePageOnclick',
        value: function handlePageOnclick(pageNum) {
            var pageSize = this.props.pageSize;
            this.props.getAjaxList((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize);
            /*console.log(pageNum);*/
            pageOn(pageNum);
        }
    }, {
        key: 'render',
        value: function render() {
            var THIS = this;
            var props = this.props;
            var pageOn = false;
            if (props.pageNum == THIS.state.start / this.props.pageSize + 1) {
                pageOn = true;
            }
            return _react2.default.createElement(
                'a',
                { className: pageOn ? "on" : "butGray", href: 'javascript:;',
                    onClick: this.handlePageOnclick.bind(this, props.pageNum) },
                props.pageNum
            );
        }
    }]);

    return PageItem;
}(_react.Component);

exports.default = Entry;