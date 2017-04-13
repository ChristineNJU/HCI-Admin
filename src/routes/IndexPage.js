import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MenuManager from '../components/MenuManager';

function IndexPage() {
  return (
    <div>
      <div className={styles.headerWrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            FireStove 点餐系统后台管理
          </div>
        </div>
      </div>
      <MenuManager/>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
