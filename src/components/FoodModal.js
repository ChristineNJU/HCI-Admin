/**
 * Created by christine on 2017/4/12.
 */
import React, { Component } from 'react';
import { Modal, Form, Input,InputNumber,Select,Switch,Upload,Button,Icon } from 'antd';
const {Option} = Select;

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
        // onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    // const { name, email, website } = this.props.record;
    const name='111';
    const email='christine.zxz@gmail.com';
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const uploadProps = {
      action: '/upload.do',
      listType: 'picture',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: '/yay.jpg',
        thumbUrl: '/yay.jpg',
      }]
    };

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
                  initialValue: '煮物',
                })(
                  <Select>
                  <Option value={'煮物'}>煮物</Option>
                </Select>
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜品名称"
            >
              {
                getFieldDecorator('name', {
                  initialValue: 'Miso便当',
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="菜品原价"
            >
              {
                getFieldDecorator('price', {
                  initialValue: 18,
                })(<InputNumber style={{'width':'100%'}}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="会员价格"
            >
              {
                getFieldDecorator('priceVip', {
                  initialValue: 16,
                })(<InputNumber style={{'width':'100%'}}/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="使用菜品"
            >
              {getFieldDecorator('inUse', {
                  initialValue: email,
                })(<Switch checkedChildren="使用中" unCheckedChildren="已停用"
                           defaultChecked={true}  />)}
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

export default Form.create()(RoomModal);

