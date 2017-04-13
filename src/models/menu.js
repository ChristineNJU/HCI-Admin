
import data from './data';

export default {
  namespace: 'menu',
  state: {
    allFood:[],
    foodNum:null,
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
      return {...state,allFood:initFood,foodNum:initFood.length}
    },
    addFood(state,{payload}){
      let newFood = payload.values;
      newFood['key'] = state.foodNum;
      newFood['img'] = 'new';
      let newAll = state.allFood.concat(payload.values);
      return {...state,allFood:newAll,foodNum:state.foodNum+1};
    },
    editFood(state,{payload:{key,values}}){
      let newList = state.allFood.slice(0);
      newList.forEach((item)=>{
        if( item.key == key){
          Object.keys(item).map((key)=>{
            if(key != 'recommend' && key != 'soldOut' && key != 'img')
              item[key] = values[key];
          });
        }
        item['key'] = key;
      });
      return {...state,allFood:newList}
    },
    soldOutChange(state,{payload:{key,value}}){
      let newList = state.allFood.slice(0);
      newList.forEach((item)=>{
        if( item.key == key){
          item['soldOut'] = value;
        }
      });
      return {...state,allFood:newList}
    },
    recommendChange(state,{payload:{key,value}}){
      let newList = state.allFood.slice(0);
      newList.forEach((item)=>{
        if( item.key == key){
          item['recommend'] = value;
        }
      });
      return {...state,allFood:newList}
    },
    changeFilter(state,{payload:{type,status}}){
      return {...state,filter:{status:status,type:type,keyword:''}}
    },
    changeKeyword(state,{payload:{keyword}}){
      let newFilter = {keyword:keyword,type:'全部',status:'全部'};
      return {...state,filter:newFilter};
    },
    addType(state,{payload:{typeName}}){
      let newType = {type:typeName,num:0,order:state.types.length};
      let newTypes = state.types.concat(newType);
      return {...state,types:newTypes}
    },
    orderChange(state,{payload:{name,order}}){
      let newTypes = state.types.concat();
      let index1 = newTypes.find((item,index,arr)=>{
        return item.type === name;
      }).order;
      let index2 = order === 'up' ?index1-1:index1+1;
      let name2 = newTypes.find((item,index,arr)=>{
        return item.order === index2;
      }).type;
      for(let i = 0 ;i < newTypes.length;i++){
        if(newTypes[i].type === name){
          newTypes[i].order = index2;
        }
        if(newTypes[i].type === name2){
          newTypes[i].order = index1;
        }
      }
      return {...state,types:newTypes};
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
