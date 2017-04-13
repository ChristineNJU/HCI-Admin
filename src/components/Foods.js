/**
 * Created by christine on 2017/4/12.
 */
import React from 'react';
import {connect} from 'dva';
import styles from '../routes/IndexPage.css';
import { Button,Switch,notification } from 'antd';
import FoodModal from './FoodModal';

let SingleFood = React.createClass({
  // console.log(info);
  // let type = info.type;

  openNotificationWithIcon (type,name) {
    // console.log(t);
    return function () {
      notification[type]({
        message: name+'置为售罄成功！',
        // description: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案'
      });
    };
  },



  render (){
    const {type,name,img,price,priceVip,soldOut,recommend,inUse} = this.props.info;
    const url = "/food/"+type+"/"+name+"V.png";

    return(
      <div className={styles.foodSingle}>
        <div className={styles.rowWrapper}>
          <img className={styles.foodImg} src={url}/>
          {inUse==false ? <div className={styles.foodImgMask}>已停用</div> :''}
        </div>
        <div className={styles.infoWrapper}>

          <div className={styles.rowWrapper}>
            <h2>{type} - {name}</h2>

            <FoodModal onOk={{}} title={'编辑菜品'}>
              <Button style={{'height':'30px'}}>编辑信息</Button>
            </FoodModal>


          </div>

          <div className={styles.rowWrapper}>
            <p className={styles.price}>
              价格：<span className={styles.priceSpan}>￥{price} </span> &nbsp;&nbsp;&nbsp;
              会员价：<span className={styles.priceSpan}>￥{priceVip} </span>
              </p>
            <div className={styles.buttonsWrapper}>
              <Switch checkedChildren="售罄" unCheckedChildren="售罄"
                      checked={soldOut}
                      onChange={() => this.props.soldOutChange(name)}/>

              <Switch checkedChildren="推荐" unCheckedChildren="推荐"
                      checked={recommend}
                      onChange={() => this.props.recommendChange(name)}/>

            </div>
          </div>
          <p className={styles.description}>此物只应天上有，人间能得几回尝，哈哈哈哈哈哈。blablabla噗噗噗噗噗噗噗，非常好吃，原料也非常新鲜。11111111是的还烧横扫维护队伍哦读完都熬我无偶朵云我补的。</p>
        </div>
      </div>
    )
  }

});


function Foods({dispatch,foods}) {

  function soldOutChange(name){
    dispatch({
      type:'menu/soldOutChange',
      payload:{
        name:name
      }
    })
  }

  function recommendChange(name) {
    dispatch({
      type:'menu/soldOutChange',
      payload:{
        name:name
      }
    })
  }

  return (
    <div className={styles.foods}>
      <div className={styles.blockTitle}>
        <div className={styles.rowWrapper}>
          <h1 className={styles.h1}>菜品列表</h1>
          {/*<Button className={styles.orderButton}>煮物排序</Button>*/}
        </div>
      </div>
      <div className={styles.foodList}>
        {foods.length == 0?<div className={styles.foodSingle}>无筛选结果</div>:''}
        {foods.map(item => {
          return <SingleFood info={item}
                             soldOutChange={soldOutChange} recommendChange={recommendChange}/>
        })}

      </div>
    </div>
  )
}


function mapStateToProps(state){
  // console.log(state.menu.foodShow);
  return {foods:state.menu.foodShow}
}

module.exports = connect(mapStateToProps)(Foods);
