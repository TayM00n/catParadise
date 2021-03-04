import React, {useEffect} from 'react'
import {Header} from './Header'
import './style.css'
//import {setData, setDataFilled, setTempData} from "./store/action/homePageAC";

const useIsMounted = () => {
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);
  return isMounted;
};

const Main = ({data, someData, fullTempData, isFilled, currentPage, limit, setData, setFullTempData, setIsFilled, setCurrentPageAndLimit}) => {
  //console.log("MAIN", fullTempData, viewTempData)

  const CatCard = ({data}) => {
    const cat = {...data}
    return(
      <div className="cat-card">
        <div className="cat-card-image">
          <img src={cat.url} loading="lazy"
               alt={cat.name}/>
        </div>
        <div className="cat-card-body">
          <div>
            <h1 className="cat-name">{cat.name}</h1>
            <p className="cat-origin"><strong>{cat.origin}</strong></p>
          </div>
          <div className="cat-attributes">
            <p>
              <span>Temperament:</span>{cat.temperament}</p>
            <p>
              <span>Life Span:</span> {cat.life_span}
            </p>
            <p>
              <span>Weight:</span> {cat.weight.metric}
            </p>
          </div>
          <div className="cat-desc">
            <p>
              <span>Description</span>
            </p>
            <p>
              {cat.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const CatCards = ({data}) => {
    //console.log(data)
    const cats = [...data]

    return cats.map((cat) => <CatCard data={cat} key={cat.name}/>)
  }

  const fetchCatData = async () => {
    const response = await fetch("/api")
    const cats = await response.json()
    if(cats.newModifyData){
      setData(cats.newModifyData)
      setFullTempData(cats.newModifyData)
      setIsFilled(true)
    }else{
      alert(cats.error.message)
    }

  }

  useEffect(()=>{
    !isFilled && fetchCatData()
    //console.log(someData)
  }, [isFilled])

  const filterCats = () => {
    const filteredCats = []
    const countries = data.map(({ origin }) => origin)
    const setCountries = new Set(countries)
    for (let country of setCountries) {
      const countryList = data.filter(
        ({ origin }) => origin === country
      )
      filteredCats.push(countryList)
    }
    const sortedCats = [...filteredCats].sort((a, b) => {
      return a.length - b.length
    })
    return sortedCats
  }

  /*const setViewPage = (number) => {
    //console.log('setViewPage',fullTempData)
    let catsByPages = []
    let i = number*limit

    //console.log(fullTempData)
    catsByPages = fullTempData.filter( (item, index) => {
      let val = false

      if(i<limit*(number+1) && index === i){
        //console.log(index , i)
        val = index === i
        i++
        return val
      }
      return val
    })
    return catsByPages
  }*/

  const handleCatFilter = (org) => {
    //debugger
    //console.log(org)
    const countryList = [...data].filter(({ origin }) => origin === org)
    setFullTempData(countryList)
    setCurrentPageAndLimit(0, limit)
  }

  /*let [isShow, setIsShow] = useState(false)

  if(fullTempData.length !== 0 && !isShow){
    setViewTempData(setViewPage())
    setIsShow(true)
  }*/

  //setViewPage(currentPage)

  const handleAllCats = () => {
    setFullTempData(data)
    setCurrentPageAndLimit(0, limit)
    //setIsShow(false)
  }

  let handlerPageChange = (number) => {
    setCurrentPageAndLimit(number, limit)
    //setIsShow(false)
  }

  const Pages = ({num}) =>{
    let pageCount = []

    for(let i = 1; i <= Math.ceil(num/limit); i++){
      pageCount.push(i)
    }

    return pageCount.map((i, index) => {
      return <span className={currentPage===index ? "page-active" : ""} key={i} onClick={()=> handlerPageChange(index)}>{i}</span>
    })
  }

  return(
    <>

      <div className="App">
        <Header dataCat={data}/>
        <div className='cats-nav'>
          {filterCats().map((c) => {
            return (
              <div key={c[0].origin} onClick={() => handleCatFilter(c[0].origin)}>
                {c[0].origin}({c.length})
              </div>
            )
          })}
          {data.length > 0 && (
            <div onClick={handleAllCats}>All</div>
          )}
        </div>
        <div className="grp-pages">
          <Pages num={fullTempData.length}/>
        </div>
        <div className='cat-cards'>
          <CatCards data={someData}/>
        </div>
      </div>
    </>
  )
}

export default Main




/*const fetchCatData = async (page, limit) => {
  console.log(page, limit)
  const url = `https://api.thecatapi.com/v1/breeds?page=${page}&limit=${limit}`
  const urlForSize = `https://api.thecatapi.com/v1/breeds`
  try {
    const res = await fetch(urlForSize)
    const allCat = await res.json()

    const response = await fetch(url)
    const cats = await response.json()
    const modifyData = await Promise.all(
      cats.map(async (cat) => {
        let url = await fetch(
          `https://api.thecatapi.com/v1/images/search?breed_id=${cat.id}`
        )
        let image = await url.json()
        cat.url = image[0].url
        return cat
      })
    )
    //debugger
    setData(modifyData, allCat.length)
    setTempData(modifyData)
    setIsFilled(true)
  } catch (error) {
    console.log(error)
  }
}*/

{/*{
        !isFilled ? "DATA LOAD" :
        <div className="App">
          <Header dataCat={data}/>
          <div className='cats-nav'>
            {filterCats().map((c) => {
              return (
                <div key={c[0].origin} onClick={() => handleCatFilter(c[0].origin)}>
                  {c[0].origin}({c.length})
                </div>
              )
            })}
            {data.length > 0 && (
              <div onClick={handleAllCats}>All</div>
            )}
          </div>
          <div className="grp-pages">
              <Pages num={count}/>
          </div>
          <div className='cat-cards'>
            <CatCards data={fullTempData}/>
          </div>
        </div>
      }*/}