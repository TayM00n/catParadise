import {TYPES} from '../TYPES'

export const setData = (data,count) => ({
  type: TYPES.SET_MAIN_INFO,
  data
})

export const setFullTempData = fullTempData => ({
  type: TYPES.SET_FULL_TEMP_DATA,
  fullTempData
})

export const setIsFilled = isFilled => ({
  type: TYPES.SET_DATA_FILLED_INFO,
  isFilled
})

export const setCurrentPageAndLimit = (currentPage, limit) => ({
  type: TYPES.SET_PAGE_AND_LIMIT,
  currentPage,
  limit
})