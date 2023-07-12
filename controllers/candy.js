const Candy = require('../models/candy');

const express = require('express');

exports.getCandy = async(req,res) => {
    try{
        const all = await Candy.findAll();

        res.status(201).json(all);
    }
    catch (err) {
        console.log(err, "not able to get details of candies");
    }
};

exports.postCandy = async(req,res, next) => {
      try{
        const product =req.body.product;
        const productCode =req.body.productCode;
        const qty =req.body.qty;
        const perPrice =req.body.perPrice;

        const data = await Candy.create({
            product:product,
            productCode:productCode,
            qty:qty,
            perPrice:perPrice,
        });

        res.status(201).json(data);
      }
      catch(err){
        res.status(404).json({error :err});
      }
};

exports.deleteCandy = async(req,res) => {
    try{
        const candId = req.params.candId;
        console.log(candId);
        const candyField = await Candy.findByPk(candId);
        console.log(candyField);

        await candyField.destroy();

        res.status(201).json({delete: candyField});
        
    }
    catch(err) {
        console.log(err);
    }
}