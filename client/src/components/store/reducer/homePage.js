import {TYPES} from '../TYPES'

let initState = {
  data: [],
  fullTempData: [],
  someData: [],
  isFilled: false,
  currentPage: 0,
  limit: 5
}

const homePage = (state = initState, action) => {

  const setSomeData = (data ,page) => {
    let catsByPages = []
    let i = page*state.limit

    //console.log(fullTempData)
    catsByPages = data.filter( (item, index) => {
      let val = false

      if(i<state.limit*(page+1) && index === i){
        //console.log(index , i)
        val = index === i
        i++
        return val
      }
      return val
    })
    return catsByPages
  }
  //console.log("REDUCERS--state", state,"\n","REDUCERS--action",action)
  switch(action.type){
    case TYPES.SET_MAIN_INFO: {
      return {
        ...state,
        data: action.data
      }
    }
    case TYPES.SET_FULL_TEMP_DATA: {
      return {
        ...state,
        fullTempData: action.fullTempData,
        someData: setSomeData(action.fullTempData, state.currentPage)
      }
    }
    case TYPES.SET_DATA_FILLED_INFO: {
      return {
        ...state,
        isFilled: action.isFilled
      }
    }
    case TYPES.SET_PAGE_AND_LIMIT: {
      return {
        ...state,
        currentPage: action.currentPage,
        limit: action.limit,
        someData: setSomeData(state.fullTempData, action.currentPage)
      }
    }
    default: return state
  }
}

export default homePage