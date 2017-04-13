/**
 * Created by christine on 2017/4/11.
 */
import React from 'react';
import styles from '../routes/IndexPage.css';
import { Form,Input,Select,Button,Alert } from 'antd';
import {connect} from 'dva';

function FiltersWrapper({dispatch,types,filter}) {

  function changeKeyword(value){
    // console.log(e.target.value);
    dispatch({
      type:`menu/changeKeyword`,
      payload:{
        keyword:value
      }
    })
  }

  function changeType(type) {
    // console.log(type);
    dispatch({
      type:`menu/changeFilter`,
      payload:{
        type:type,
        status:filter.status
      }
    })
  }

  function changeStatus(status) {
    dispatch({
      type:`menu/changeFilter`,
      payload:{
        type:filter.type,
        status:status
      }
    })
  }

  return(
    <Filters types={types} filter={filter}
              changeKeyword={changeKeyword}
              changeType={changeType}
              changeStatus={changeStatus}/>
  )
}

let Filters = React.createClass({

  getInitialState(){
    return{
      search:0
    }
  },

  removeKeyword(){
    this.props.changeKeyword('');
  },

  render(){
    let types = this.props.types;
    let filter = this.props.filter;


    let style= filter.keyword == '' ?
      {'overflow': 'hidden','position':'relative'}:
      {'overflow': 'hidden','position':'relative','filter':'grayscale(100%)'};

    return (
      <div className={styles.leftMenu}>
        <div className={styles.blockTitle}>
          <h1 className={styles.h1}>菜品筛选</h1>
        </div>
        <div style={{'position':'relative'}}>
          <Input type="text" required="required" size="large"
                 style={{'border':'none','outline':'none','paddingLeft':'10px','color':'#999'}}
                 className={styles.searchInput}
                 placeholder={'输入关键字搜索'}
                 value={filter.keyword}
                 onChange={(e) => this.props.changeKeyword(e.target.value)}/>
          {filter.keyword!=''?
          <Button size="small"
                  style={{'position':'absolute','right':'0','marginRight':'10px','marginTop':'8px','fontSize':'10px','fontWeight':'lighter'}}
                  onClick={this.removeKeyword}>清除</Button>
            :''}
        </div>


        <div className={styles.split}></div>
        <div style={style}>
          {filter.keyword!=''?<div className={styles.typeMask}></div>:''}
          <p className={styles.label}>种类</p>
          <div className={styles.typeWrapper}>
            {types.map(item => {
              return <TypeFilter type={item} picked={filter.type}
                                  handle={this.props.changeType}/>

            })}
          </div>
          <p className={styles.label}>状态</p>
          <div className={styles.typeWrapper}>
            <StatusFilter value={'全部'} picked={filter.status} handle={this.props.changeStatus}/>
            <StatusFilter value={'售罄'} picked={filter.status} handle={this.props.changeStatus}/>
            <StatusFilter value={'推荐'} picked={filter.status} handle={this.props.changeStatus}/>
            <StatusFilter value={'会员特价'} picked={filter.status} handle={this.props.changeStatus}/>
            <StatusFilter value={'停用'} picked={filter.status} handle={this.props.changeStatus}/>
          </div>
        </div>
      </div>
    )
  }
});

let TypeFilter = React.createClass({
  handleClick(){
    this.props.handle(this.props.type.type);
  },

  render(){
    let type = this.props.type;
    let picked = this.props.picked;
    if(type.type == picked){
      return (
        <div className={styles.typePicked} onClick={this.handleClick}>{type.type}&nbsp;&nbsp;{type.num}</div>
      )
    }else{
      return (
        <div className={styles.type} onClick={this.handleClick}>{type.type}&nbsp;&nbsp;{type.num}</div>
      )
    }

  }
});


let StatusFilter = React.createClass({
  handleClick(){
    this.props.handle(this.props.value);
  },

  render(){
      let value = this.props.value;
      let picked = this.props.picked;

      if(value == picked){
        return(
          <div className={styles.typePicked} onClick={this.handleClick}>{value}</div>
        )
      }else{
        return (
          <div className={styles.type} onClick={this.handleClick}>{value}</div>
        )
      }

  }
});

function mapStateToProps(state) {
  return {types:state.menu.types,filter:state.menu.filter};
}

module.exports = connect(mapStateToProps)(FiltersWrapper);
