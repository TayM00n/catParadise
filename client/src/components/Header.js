import React from 'react'

export const Header = (dataCat) => {
  const calculateAverage = ({dataCat}) => {
    const weightAndAge = dataCat.map((cat) => {
      const weight = cat.weight.metric.split(' - ').reduce((acc, cur) => +acc + +cur)
      const age = cat.life_span.split(' - ').reduce((acc, cur) => +acc + +cur)
      return {
        weight: weight / 2,
        age: age / 2,
      }
    })

    let weight = 0
    let age = 0

    weightAndAge.forEach((item, i) => {
      weight += item.weight
      age += item.age
    })
    let average = {
      weight: (weight / weightAndAge.length).toFixed(2),
      age: (age / weightAndAge.length).toFixed(2),
    }

    return average
  }

  const DrawHeader = ({dataCat}) => {
    return(
      <div className='header-wrapper'>
        <div className="title">
          <h1 className="cats-header-title">Cats Paradise</h1>
          <p>There are <span className="cats-numbers">{dataCat.length}</span> cat breeds</p>
          <small className="cat-summary">
            On average a cat can weight about <strong className="average">{calculateAverage(dataCat).weight}</strong> Kg
            and lives <strong className="average">{calculateAverage(dataCat).age}</strong> years.
          </small>
        </div>
      </div>
    )
  }


  return(
    <div className='cat-header'>
      <DrawHeader dataCat={dataCat}/>
    </div>
  )
}