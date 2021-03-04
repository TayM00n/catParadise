import {connect} from 'react-redux'
import Main from "../../Main"
import {setData, setFullTempData, setIsFilled, setCurrentPageAndLimit} from "../../store/action/homePageAC";

const mapStateToProps = (state) => {
  //console.log("mapStateToProps",state)
  return{
    data: state.homePage.data,
    fullTempData: state.homePage.fullTempData,
    someData: state.homePage.someData,
    isFilled: state.homePage.isFilled,
    currentPage: state.homePage.currentPage,
    limit: state.homePage.limit
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return{
    setData: (data) => {
      //console.log("setData", data)
      return dispatch(setData(data))
    },
    setFullTempData: (fullTempDate) => {
      //console.log("setFullTempData", fullTempDate)
      dispatch(setFullTempData(fullTempDate))
    },
    setIsFilled: (value) => dispatch(setIsFilled(value)),
    setCurrentPageAndLimit: (page, limit) => dispatch(setCurrentPageAndLimit(page, limit))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
