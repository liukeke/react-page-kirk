/*
 * demo
 * <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start} getAjaxList={this.getAjaxList.bind(this)}/>
 * */

import React,{Component} from 'react';
import './page.css';
class Entry extends Component{
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
    handlePagePrevOrpageNextOnclick(type){
        var pageSize = this.state.pageSize;
        var pageNumOn = document.getElementsByClassName("page")[0].getElementsByClassName("on")[0].innerText;
        if (type == 1) {
            this.props.getAjaxList(pageNumOn * pageSize, pageNumOn * pageSize + pageSize);
        } else {
            this.props.getAjaxList((pageNumOn - 1) * pageSize - pageSize, (pageNumOn - 1) * pageSize);
        }
    }
    componentDidMount(){
        var state = this.state;
        var num = Math.ceil(state.totalNum / state.pageSize);
        var pageNumOn = state.start / state.pageSize + 1;
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
                numArray.push(i)
            }
        }
        if (num > pageSize) {
            var kkk = parseInt(pageNumOn) + (pageSize / 2) - 1;
            for (var i = 1; i <= pageSize; i++) {
                numArray.push(i)
            }
            if (kkk > pageSize) {
                numArray = [];
                if (kkk <= num) {
                    for (var i = kkk - pageSize + 1; i <= kkk; i++) {
                        numArray.push(i)
                    }
                }
                if (kkk > num) {
                    for (var i = num - pageSize + 1; i <= num; i++) {
                        numArray.push(i)
                    }
                }
            }
        }
        var item = numArray.map(function (data, index) {
            return <PageItem key={data} pageNum={data} pageSize={pageSize} start={start}
                             getAjaxList={THIS.props.getAjaxList}/>
        });
        return (
            <div className="page">
                <a className={state.pagePrev ? "butGray" : "PrevNextNo"} href="javascript:;"
                   onClick={state.pagePrev ? this.handlePagePrevOrpageNextOnclick.bind(this,0) : null}>上一页</a>
                {item}
                <a className={state.pageNext ? "butGray" : "PrevNextNo"} href="javascript:;"
                   onClick={state.pageNext ? this.handlePagePrevOrpageNextOnclick.bind(this,1) : null}>下一页</a>
            </div>
        )
    }
}
class PageItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            start: this.props.start
        };
    }
    handlePageOnclick(pageNum) {
        var pageSize = this.props.pageSize;
        this.props.getAjaxList((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize);
    }
    render(){
        var THIS = this;
        var props = this.props;
        var pageOn = false;
        if (props.pageNum == THIS.state.start / this.props.pageSize + 1) {
            pageOn = true;
        }
        return (
            <a className={pageOn ? "on" : "butGray"} href="javascript:;"
               onClick={this.handlePageOnclick.bind(this,props.pageNum)}>{props.pageNum}</a>
        )
    }
}

export default Entry;