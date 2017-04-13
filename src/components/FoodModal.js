/**
 * Created by christine on 2017/4/12.
 */
import React, { Component } from 'react';
import { Modal, Form, Input,InputNumber,Select,Switch,Upload,Button,Icon,message } from 'antd';
const {Option} = Select;
import {connect} from 'dva';
const FormItem = Form.Item;


class RoomModal extends Component {


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

  okHandler = () => {
    // const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.upload == ''){message.error('请上传图片');return;}
        if(values.name == ''){message.error('请填写名称');return;}
        if(values.type == ''){message.error('请选择菜品类别');return;}
        if(values.price == null){message.error('请填写价格');return;}
        if(values.priceVip == null){message.error('请填写会员价格');return;}
        let dispatch = this.props.dispatch;

        if(this.props.title == '添加菜品'){
          dispatch({
            type:'menu/addFood',
            payload:{
              values:values,
            }
          });
          message.success('添加新菜'+values.name+'成功！',this.hideModelHandler());
        }else{
          // console.log(this.props);
          dispatch({
            type:'menu/editFood',
            payload:{
              key:this.props.keyNum,
              values:values,
            }
          });
          message.success('编辑菜品'+values.name+'成功！',this.hideModelHandler());
        }
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const {name,type,price,priceVip,soldOut,inUse,recommend,img} = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    let imgUrl = this.props.title == '添加菜品'? null :[{uid:-1,name:name+'.png',status:'done',url:'/food/'+img+'V.png'}]

    const uploadProps = {
      action: '/upload.do',
      listType: 'picture',
      defaultFileList: imgUrl
    };

    let types = this.props.types.slice(1);

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form horizontal onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="菜品图片"
            >
              {getFieldDecorator('upload', {
                initialValue: name,
              })(
                <Upload {...uploadProps}>
                  <Button type="ghost">
                    <Icon type="upload" /> 点击上传
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜品类别"
            >
              {getFieldDecorator('type', {
                  initialValue: type,
                })(
                  <Select>
                    {types.map((item)=>{

                        return <Option value={item.type}>{item.type}</Option>;

                    })}
                  </Select>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜品名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: name,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜品原价"
            >
              {
                getFieldDecorator('price', {
                  initialValue: price,
                })(<InputNumber style={{'width':'100%'}}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="会员价格"
            >
              {
                getFieldDecorator('priceVip', {
                  initialValue: priceVip,
                })(<InputNumber style={{'width':'100%'}}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="使用菜品"
            >
              {getFieldDecorator('inUse', {
                  initialValue: inUse,
                })(<Switch checkedChildren="使用中" unCheckedChildren="已停用"
                           defaultChecked={inUse}  />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜品描述"
            >
              {
                getFieldDecorator('description', {
                  initialValue: '此物只应天上有，人间能得几回尝，哈哈哈哈哈哈。blablabla噗噗噗噗噗噗噗，非常好吃，原料也非常新鲜。11111111是的还烧横扫维护队伍哦读完都熬我无偶朵云我补的。',
                })(<Input type="textarea" placeholder="菜品描述" style={{'height':'120px'}} />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}


RoomModal.defaultProps = {
  name:'',
  type:'',
  price:null,
  priceVip:null,
  inUse:true,
  soldOut:false,
  recommend:false,
};

function mapStateToProps(state) {
  return {types:state.menu.types}
}

export default connect(mapStateToProps)(Form.create()(RoomModal));

