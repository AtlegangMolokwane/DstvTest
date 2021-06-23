var express = require('express');
var router = express.Router();
var data = require('../Data/Data.json');
const fs = require('fs')

router.get('/', function(req,res,next){
    // res.json(data)
    fs.readFile(`${__dirname}/../Data/Data.json`, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({
              status: false,
              result: err
          })
        }
        
        res.status(200).json(JSON.parse(data))
       
  
      })
});

router.post('/post', function(req,res,next){

    fs.readFile(`${__dirname}/../Data/Data.json`, 'utf8', (err, data) => {
        if (err) {
          res.send(err.message)
        }

    let obj = {
        SKU: req.body.SKU,
        Name: req.body.Name,
        Price: req.body.Price,
        Measurements: req.body.Measurements
    }
      data = JSON.parse(data)
  
      obj.id = data.length + 1
      
  
      data.push(obj)
      data = JSON.stringify(data)
  
      fs.writeFile(`${__dirname}/../Data/Data.json`, data, _err => {
        
        if (_err){
          // res.send(_err)

          res.status(500).json({
            status: false,
            results: _err
          })
        }
        
        
      })
  
    })
    
    res.status(200).json({
      status: true,
      results: "ALL GOOD"
    })
  
});

router.post('/delete', function(req,res,next){

    fs.readFile(`${__dirname}/../Data/Data.json`, 'utf8', (err, data) => {
        if (err) {
          res.send(err.message)
        }
     
        data = JSON.parse(data)
        data = data.filter(point => point.id != req.body.id)
        data = JSON.stringify(data)
    
        fs.writeFile(`${__dirname}/../Data/Data.json`, data, _err => {
          
         
          if (_err){
              // res.send(_err)
    
              res.status(500).json({
                status: false,
                results: _err
              })}
          
          
        })
    
      res.status(200).json({
          status: true,
          results: "ALL GOOD"
        })
    })


});

module.exports = router;