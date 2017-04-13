/**
 * Created by christine on 2017/4/12.
 */
import React from 'react';
import {connect} from 'dva';
import styles from '../routes/IndexPage.css';
import { Button,Switch,message } from 'antd';
import FoodModal from './FoodModal';

let SingleFood = React.createClass({
  openNotificationWithIcon (type,name) {
    return function () {
      notification[type]({
        message: name+'置为售罄成功！',
      });
    };
  },

  render (){
    const {type,name,img,price,priceVip,soldOut,recommend,inUse,key} = this.props.info;
    // const url = "/food/"+type+"/"+name+"V.png";
    const url = "/food/"+img+"V.png";

    return(
      <div className={styles.foodSingle}>
        <div className={styles.rowWrapper}>
          <img className={styles.foodImg} src={url}/>
          {inUse==false ? <div className={styles.foodImgMask}>已停用</div> :''}
        </div>
        <div className={styles.infoWrapper}>

          <div className={styles.rowWrapper}>
            <h2>{type} - {name}</h2>

            <FoodModal onOk={{}} title={'编辑菜品'} name={name} type={type} price={price} img={img}
                       priceVip={priceVip} inUse={inUse} soldOut={soldOut} recommend={recommend} keyNum={key}>
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
                      onChange={(e) => this.props.soldOutChange(key,e)}/>

              <Switch checkedChildren="推荐" unCheckedChildren="推荐"
                      checked={recommend}
                      onChange={(e) => this.props.recommendChange(key,e)}/>

            </div>
          </div>
          <p className={styles.description}>此物只应天上有，人间能得几回尝，哈哈哈哈哈哈。blablabla噗噗噗噗噗噗噗，非常好吃，原料也非常新鲜。11111111是的还烧横扫维护队伍哦读完都熬我无偶朵云我补的。</p>
        </div>
      </div>
    )
  }

});


function Foods({dispatch,foods}) {

  function soldOutChange(key,value){
    dispatch({
      type:'menu/soldOutChange',
      payload:{
        key:key,
        value:value
      }
    },message.success('设置售罄状态成功！'))
  }

  function recommendChange(key,value) {
    dispatch({
      type:'menu/recommendChange',
      payload:{
        key:key,
        value:value
      }
    },message.success('设置推荐状态成功！'))
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
          {/*console.log(item.key);*/}
          return <SingleFood info={item}
                             soldOutChange={soldOutChange} recommendChange={recommendChange}/>
        })}

      </div>
    </div>
  )
}


function mapStateToProps(state){
  const {allFood,filter} = state.menu;
  const {type,status,keyword} = filter;
  let foodShow = allFood.slice(0);
  if(keyword != ''){
    foodShow = foodShow.filter((item,index,arr)=>{
      return item.name.indexOf(keyword) >= 0;
    })
  }else{
    foodShow = foodShow.filter((food,index,arr)=>{
      if(type == '全部' || type == food.type){
        if(status == '售罄'){
          return food.soldOut
        }
        if(status == '推荐'){
          return food.recommend
        }
        if(status == '会员特价'){
          return food.price != food.priceVip
        }
        if(status == '停用'){
          return !food.inUse
        }
        if(status == '全部'){
          return true;
        }
      }
    })
  }


  return {foods:foodShow}
}

module.exports = connect(mapStateToProps)(Foods);
