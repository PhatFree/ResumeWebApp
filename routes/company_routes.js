var express = require('express');
var router = express.Router();
var company_dal = require('../model/company_dal');


// View All companys
router.get('/all', function(req, res) {
    company_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('company/companyViewAll', { 'result':result });
        }
    });

});

// View the company for the given id
router.get('/', function(req, res){
    if(req.query.company_id == null) {
        res.send('company_id is null');
    }
    else {
        company_dal.getById(req.query.company_id, function(err,result) {
           if (err) {
               res.send(err);
           }
           else {
               res.render('company/companyViewById', {'result': result});
           }
        });
    }
});

// Return the add a new company form
router.get('/add', function(req, res){

            res.render('company/companyAdd');
    });

// View the company for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.company_name == null) {
        res.send('Company Name must be provided.');
        }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        company_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/company/all');
            }
        });
    }
});

// Delete a company for the given company_id
router.get('/delete', function(req, res){
    if(req.query.company_id == null) {
        res.send('company_id is null');
    }
    else {
        company_dal.delete(req.query.company_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/company/all');
            }
        });
    }
});

module.exports = router;
