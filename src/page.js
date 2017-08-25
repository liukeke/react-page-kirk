/*
 * demo
 * <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start} getAjaxList={this.getAjaxList.bind(this)}/>
 * */

import React, {Component} from 'react';
import './page.css';

let pageOn = function (pageOn) {
    window.location.hash = 'pageOn=' + pageOn;
};


class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum: this.props.totalNum,
            pageSize: this.props.pageSize,
            start: this.props.start,
            pagePrev: false,
            pageNext: false
        };
    }

    handlePagePrevOrPageNextOnclick(type) {

        let pageSize = this.state.pageSize;
        let pageNumOn = document.getElementsByClassName("page")[0].getElementsByClassName("on")[0].innerText;
        if (type == 1) {
            this.props.getAjaxList(pageNumOn * pageSize, pageNumOn * pageSize + pageSize);
            pageOn(parseInt(pageNumOn) + 1);
        } else {
            this.props.getAjaxList((pageNumOn - 1) * pageSize - pageSize, (pageNumOn - 1) * pageSize);
            pageOn(parseInt(pageNumOn) - 1);
        }

    }

    handlePageOnclick(pageNum) {
        let pageSize = this.state.pageSize;
        this.props.getAjaxList((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize);
        pageOn(pageNum);
    }

    componentDidMount() {
        let state = this.state;
        let num = Math.ceil(state.totalNum / state.pageSize);
        let pageNumOn = state.start / state.pageSize + 1;
        /*判断是否有下一页*/
        if (num > 1) {
            this.setState({pageNext: true});
        }
        if (num == pageNumOn) {
            this.setState({pageNext: false});
        }
        /*判断是否有上一页*/
        if (pageNumOn > 1) {
            this.setState({pagePrev: true});
        }
    }

    render() {
        let state = this.state;
        let totalNum = state.totalNum;
        let start = state.start;
        let pageSize = state.pageSize;
        let num = Math.ceil(totalNum / pageSize);

        let numArray = [];
        let pageNumOn = start / pageSize + 1;
        if (num <= pageSize) {
            for (let i = 1; i <= num; i++) {
                numArray.push(i)
            }
        }
        if (num > pageSize) {
            let kkk = parseInt(pageNumOn) + (pageSize / 2) - 1;
            for (let i = 1; i <= pageSize; i++) {
                numArray.push(i)
            }
            if (kkk > pageSize) {
                numArray = [];
                if (kkk <= num) {
                    for (let i = kkk - pageSize + 1; i <= kkk; i++) {
                        numArray.push(i)
                    }
                }
                if (kkk > num) {
                    for (let i = num - pageSize + 1; i <= num; i++) {
                        numArray.push(i)
                    }
                }
            }
        }

        let item = numArray.map((data) => {
            return <PageItem key={data} pageNum={data} pageSize={pageSize} start={start}
                             handlePageOnclick={this.handlePageOnclick.bind(this)}/>
        });
        console.log(num, numArray.length);
        return (
            <div className="page">
                {
                    state.pagePrev ?
                        <a className="butGray" href="javascript:;"
                           onClick={state.pagePrev ? this.handlePagePrevOrPageNextOnclick.bind(this, 0) : null}>上一页</a>
                        :
                        null
                }
                {
                    num > pageSize && pageNumOn > ((pageSize / 2) + 1) ?
                        <span>
                            <a className={1 === (this.state.start / this.props.pageSize + 1) ? "on" : "butGray"}
                               href="javascript:;"
                               onClick={this.handlePageOnclick.bind(this, 1)}>1</a>
                            {
                                (num > pageSize + 1) && pageNumOn > ((pageSize / 2) + 2) ?
                                    <span className="ellipsis">...</span>
                                    :
                                    null
                            }
                        </span>
                        :
                        null
                }
                {item}
                {
                   num > pageSize && pageNumOn < (num - (pageSize / 2) + 1) ?
                        <span>
                            {
                                (num > pageSize + 1) && pageNumOn < (num - (pageSize / 2)) ?
                                    <span className="ellipsis">...</span>
                                    :
                                    null
                            }
                            <a className={num === (this.state.start / this.props.pageSize + 1) ? "on" : "butGray"}
                               href="javascript:;"
                               onClick={this.handlePageOnclick.bind(this, num)}>{num}</a>
                        </span>
                        :
                        null
                }
                {
                    state.pageNext ?
                        <a className="butGray" href="javascript:;"
                           onClick={state.pageNext ? this.handlePagePrevOrPageNextOnclick.bind(this, 1) : null}>下一页</a>
                        :
                        null
                }
                <span className="totalPage">共 {num} 页</span>
                <input type="text" ref="jumpPage" onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '');
                    if(e.target.value > num){
                        e.target.value = num
                    }
                }}/>
                <a href="javascript:;" className="jumpSubmit" onClick={() => {
                    this.handlePageOnclick(this.refs.jumpPage.value)
                }}>跳转</a>
            </div>
        )
    }
}
const PageItem = (props) => (
    <a className={props.pageNum === (props.start / props.pageSize + 1) ? "on" : "butGray"} href="javascript:;"
       onClick={props.handlePageOnclick.bind(this, props.pageNum)}>{props.pageNum}</a>
);

export default Entry;