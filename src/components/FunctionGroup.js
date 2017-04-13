/**
 * Created by christine on 2017/4/12.
 */

import dva,{connect} from 'dva';
import React ,{PropTypes} from 'react';
import styles from '../routes/IndexPage.css';
import FoodModal from './FoodModal';
import TypeModal from './TypeModal';

const FunctionGroup = () => {

  return(
    <div className={styles.functionGroup}>
      <TypeModal onOk={{}} >
        <div className={styles.functionButton}>编辑分类</div>
      </TypeModal>

      <div className={styles.split}></div>
      <FoodModal onOk={{}} title={'添加菜品'}>
        <div className={styles.functionButton}>添加菜品</div>
      </FoodModal>
    </div>
  )
};


export default FunctionGroup;
