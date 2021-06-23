var express = require('express');
var router = express.Router();
const fs = require('fs')

router.get('/', function(req,res,next){
    // res.json(data)
    fs.readFile(`${__dirname}/../Data/top5Movies.json`, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({
              status: false,
              result: err
          })
        }
        
        res.status(200).json(JSON.parse(data))
       
  
      })
});


module.exports = router;