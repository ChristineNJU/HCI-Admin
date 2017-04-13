
import data from './data';

export default {
  namespace: 'menu',
  state: {
    allFood:[],
    foodShow:[],
    filter:{
      type:'全部',
      status:'全部',
      keyword:'',
    },
    types:[
      {type:'全部',num:90,order:0},
      {type:'主菜',num:10,order:1},
      {type:'刺身',num:10,order:2},
      {type:'前菜',num:10,order:3},
      {type:'沙拉',num:10,order:4},
      {type:'炸物',num:10,order:5},
      {type:'烤物',num:10,order:6},
      {type:'煮物',num:10,order:7},
      {type:'蒸物',num:10,order:8},
      {type:'铁板烧',num:10,order:9}],
  },
  reducers: {
    initResult(state,{payload:{initFood}}){
      return {...state,allFood:initFood,foodShow:initFood}
    },
    changeFilter(state,{payload:{type,status}}){
      let foodResult = state.allFood.filter((food) =>{

        if(food.type == type || type=='全部'){
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
      });
      return {...state,filter:{status:status,type:type,keyword:''},foodShow:foodResult}
    },
    changeKeyword(state,{payload:{keyword}}){
      let newFilter = {keyword:keyword,type:'全部',status:'全部'};
      let foodResult = state.allFood.filter((food) => {
        if (food.name.indexOf(keyword) > -1) {
          return true;
        }
      });
      return {...state,filter:newFilter,foodShow:foodResult};
    },
    addType(state,{payload:{typeName}}){
      console.log('111');
      let newType = {type:typeName,num:0,order:state.types.length};
      // let newTypes = state.types;
      // newTypes.push(newType);
      let newTypes = state.types.concat(newType);

      return {...state,types:newTypes}
    }
  },
  effects: {
    *init({payload}, {call, put}){
      yield put({
        type:'initResult',
        payload:{
          initFood:data.foods,
          types:data.types,
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      dispatch({
        type:'init',
      })
    }
  },
};
