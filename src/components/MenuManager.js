/**
 * Created by christine on 2017/4/11.
 */
import react from 'react';
import { connect } from 'dva';
import styles from '../routes/IndexPage.css';
import Filters from './Filters';
import FunctionGroup from './FunctionGroup';
import Foods from './Foods';
export default function MenuManager () {

  return(
    <div style={{'backgroundColor':'#FAF7F5'}}>
      <div className={styles.contentWrapper}>
        <div>
          <Filters fileter="111"/>
          <FunctionGroup/>
        </div>
        <Foods/>
      </div>
    </div>
  )

}
