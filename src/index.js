import React,{Component} from 'react';
import Page from './page.js';
/*获取路由里值*/
var urlRouterParam = function GetQueryString(name, url) {
    var reg = new RegExp(".*[&\#]" + name + "=([^&]*)(&|$)");
    if (url == null) {
        var r = window.location.hash.match(reg);
    } else {
        var r = url.match(reg);
    }
    if (r != null) return decodeURIComponent(r[1]);
    return null;
};
class Entry extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            pageSize: 10,
            start: 0
        };
    }
    getAjaxList(pageNum) {
        /*这里是ajax调用程序*/
        this.setState({totalNum:0},()=>{
            this.setState({totalNum:401,start:pageNum});
        });
    }
    componentDidMount(){
        var pageOn = urlRouterParam('pageOn');
        this.getAjaxList(pageOn ? (pageOn-1)*this.state.pageSize : 0,this.state.start + this.state.pageSize);
    }
    render() {
        var state = this.state;
        return (
            <div>
                {
                    state.totalNum ?
                        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start} getAjaxList={this.getAjaxList.bind(this)}/>
                        : null
                }
            </div>
        )
    }
}

export default Entry;