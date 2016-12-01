var express = require('express');
var router = express.Router();
var address_dal = require('../model/address_dal');


// View All addresses
router.get('/all', function(req, res) {
    address_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.getById(req.query.address_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('address/addressViewById', {'result': result});
           }
        });
    }
});


// Return the add a new address form
router.get('/add', function(req,res){

    res.render('address/addressAdd');
});

// View the address for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.street == null) {
        res.send('Address must be provided.');
    }
    else if(req.query.zipcode == null) {
        res.send('Zipcode must be provided');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        address_dal.insert(req.query, function(err) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address/all');
            }
        });
    }
});

// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.delete(req.query.address_id, function(err){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/address/all');
            }
        });
    }
});

module.exports = router;
