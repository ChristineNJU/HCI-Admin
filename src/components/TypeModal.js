/**
 * Created by christine on 2017/4/12.
 */
import dva,{connect} from 'dva';
import React, { Component } from 'react';
import { Modal, Input,Select,Button,Icon,Popconfirm,message } from 'antd';
const {Option} = Select;
import styles from '../routes/IndexPage.css';


class TypeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };


  orderUp = (name) => {
    console.log('order up');
    let {dispatch} = this.props;
    dispatch({
      type:'menu/orderChange',
      payload:{
        name:name,
        order:'up'
      }
    });
    message.success('顺序调整成功！');
  };

  orderDown = (name) =>{
    let {dispatch} = this.props;
    dispatch({
      type:'menu/orderChange',
      payload:{
        name:name,
        order:'down'
      }
    });
    message.success('顺序调整成功！');
  };

  deleteType = (key,name) =>{
    let {dispatch} = this.props;
    dispatch({
      type:'menu/deleteType',
      payload:{
        key:key,
        name:name
      }
    },message.success('分类删除成功！'));

  };

  render() {
    const { children } = this.props;
    const { dispatch }= this.props;
    function addType(name) {
      dispatch({
        type:'menu/addType',
        payload:{
          typeName:name
        }
      })
    }
    let arr = this.props.types;
    arr.sort((a,b)=>{
      if (a.order < b.order) {
        return -1;
      } else {
        return 1;
      }
    });

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title='编辑种类'
          visible={this.state.visible}
          footer={[<div></div>]}
          onCancel={this.hideModelHandler}
          width='400px'
        >
          {
            arr.map((item) => {
              return <SingleType name={item.type} order={item.order} length={arr.length} keyNum={item.key}
                                 orderUp={this.orderUp} orderDown={this.orderDown} deleteType={this.deleteType}/>})
          }

          <AddType addType={addType}/>
        </Modal>
      </span>
    );
  }
}

let AddType = React.createClass({



  getInitialState(){
    return{
      showAdd:false,
      name:'',
    }
  },
  toggle(){
    this.setState((prevState, props) => ({
      showAdd:!prevState.showAdd
    }))
  },
  inputChange(e){
    this.setState({
      name:e.target.value,
    })
  },
  addNewType(){
    this.props.addType(this.state.name,this.setState({
      showAdd:false,
      name:'',
    }),message.success('添加种类'+this.state.name+'成功！'));

  },
  render(){
    return(
      <div className={styles.addType}>
        {this.state.showAdd
          ?
          <div className={styles.singleTypeWrapper}>
            <Input size="small" className={styles.typeName} style={{'width':'120px'}}
                    value={this.state.name} onChange={this.inputChange}/>
            <div style={{'marginRight':'50px'}}>
              <Button onClick={this.toggle}>取消</Button> &nbsp;
              <Button type="primary" onClick={this.addNewType}>确定添加</Button>
            </div>
          </div>
          :
          <Button onClick={this.toggle}>添加种类</Button>
        }
      </div>
    )
  }
});

let SingleType = React.createClass({

  getInitialState(){
    return{
     // showInout:0,
    }
  },

  render(){
    if(this.props.name === '全部' || this.props.name === '其他'){
      return <div></div>
    }
    return(
      <div className={styles.singleTypeWrapper}>
        <p className={styles.typeName} style={{'width':'220px'}}
           size="small" >{this.props.name}</p>
        <div>

          <Popconfirm title="你确定要删除这个分类吗？改分类下所有菜品将转到'其他'类别中。"
                      onConfirm={()=>this.props.deleteType(this.props.keyNum,this.props.name)}
                      onCancel={{}} okText="Yes" cancelText="No">
          <Button><Icon type="delete"/></Button>&nbsp;
          </Popconfirm>

          {
            this.props.order != 2?
               <Button onClick={() => this.props.orderUp(this.props.name)}><Icon type="up"/></Button>
              : <Button disabled><Icon type="up"/></Button>
          }

          &nbsp;

          {
            this.props.order != this.props.length - 1 ?
              <Button  onClick={() => this.props.orderDown(this.props.name)}><Icon type="down"/></Button>
              :<Button disabled><Icon type="down"/></Button>

          }

        </div>
      </div>
    )
  }
});


function mapStateToProps(state) {
  return {types:state.menu.types};
}

export default connect(mapStateToProps)(TypeModal);
