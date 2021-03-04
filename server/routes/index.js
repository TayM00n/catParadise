var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', async (req, res, next) => {
  //await res.json({text: 'HOME'});
  const url = `https://api.thecatapi.com/v1/breeds`
  try {
    const response = await axios.get(url)
    const cats = await response.data
    //console.log(cats)
    const modifyData = await Promise.all(
      cats.map(async (cat) => {
        let url = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_id=${cat.id}`
        )
        let image = await url.data
        cat.url = image[0].url
        return cat
      })
    )
    let newModifyData = [...modifyData]
    console.log(newModifyData.length)
    //debugger
    //console.log("HERE")
    res.json({newModifyData})

  } catch (error) {
    res.json({error})
  }
});

module.exports = router;
