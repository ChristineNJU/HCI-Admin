/**
 * Created by christine on 2017/4/12.
 */
import dva,{connect} from 'dva';
import React, { Component } from 'react';
import { Modal, Input,InputNumber,Select,Switch,Upload,Button,Icon,notification } from 'antd';
const {Option} = Select;
import styles from '../routes/IndexPage.css';


class TypeModal extends Component {


  openNotificationWithIcon (type) {
    return function () {
      notification[type]({
        message: '分类编辑成功',
        // description: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案'
      });
    };
  }

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

  render() {
    const { children } = this.props;
    console.log(this.props);
    const { dispatch }= this.props;
    function addType(name) {
      dispatch({
        type:'menu/addType',
        payload:{
          typeName:name
        }
      })
    }
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
        >
          {
            this.props.types
            .sort((a,b)=>{return a.order - b.order})
            .map((item) => {return <SingleType name={item.type} order={item.order}/>})
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
    this.props.addType(this.state.name);
  },
  render(){
    return(
      <div className={styles.addType}>
        {this.state.showAdd
          ?
          <div className={styles.singleTypeWrapper}>
            <Input size="small" className={styles.typeName} style={{'width':'220px'}}
                    value={this.state.name} onChange={this.inputChange}/>
            <div style={{'marginRight':'120px'}}>
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
  render(){
    return(
      <div className={styles.singleTypeWrapper}>
        <Input defaultValue={this.props.name} size="small" className={styles.typeName}
          style={{'width':'220px'}}/>
        <div>
          <Button><Icon type="up" /></Button> &nbsp;
          <Button><Icon type="down" /></Button>
        </div>
      </div>
    )
  }
});


function mapStateToProps(state) {
  return {types:state.menu.types};
}

export default connect(mapStateToProps)(TypeModal);
