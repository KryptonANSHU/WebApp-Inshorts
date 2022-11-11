const jwt = require("jsonwebtoken");
const express = require("express");
const rug = require("random-username-generator");
const bcrypt = require("bcrypt")
const axios = require("axios");

const { user } = require("../models");


exports.getUser = async (req, res) => {
    try {
      console.log(req.params);
      const user_instance = await user.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(
        user_instance
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };

  exports.signup = async (req, res) => {
    let {  email, password } = req.body;
    const password_hash = await bcrypt.hash(password,10);
    try {
      const userExist = await user.findOne({
        where: {
          email: email,
        },
      });
      if (userExist) throw {message: "User already exist"}
  
      // create a randomized username
      const username = "_" + Math.random().toString(36).substr(2, 9);
      const user_instance = await user.create({
        email,
        password_hash,
        username
      });
  
      // adding the user_id to the token
      const token = jwt.sign(
        { email: email, id: user_instance.id },
        process.env.JWT_SECRET
      );
      // console.log("token",token, user_instance);
  
      console.log(token);
      res.status(200).json({
        token,
        user_instance
      });
      
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

  exports.login = async (req, res) => {
    let {  email, password } = req.body;
    const password_hash = await bcrypt.hash(password,10);
    try {

      const user_instance = await user.findOne({
        where: {
          email: email,
        },
      });
      if (!user_instance) throw {message: "User does not exist"}
      console.log(user_instance)
  
      if( !(await bcrypt.compare(password,user_instance.password_hash) ))  throw {message: "Wrong Password"}
  
  
      const token = jwt.sign(
        { email: email },
        process.env.JWT_SECRET
      );
      // console.log("token",token, user_instance);
  
      res.status(200).json({
        token,
        user_instance
      });
      
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };

  exports.updateUsername = async (req, res) => {
    const { username } = req.body;
    // console.log(req.user)
    try {
      let user_exist = await user.findOne({
        where: {
          email: req.user.email
        }
      })
      // making sure the new username is different from the existing one
      if(user_exist.username === username) {
        console.log("Same username");
        throw {message: "Enter a new username"}
      }
  
      // validation check to make sure the username isn't taken
      user_exist = await user.findOne({
        where: {
          username,
        },
      });
      
      if (user_exist){
        console.log("Username is taken");
        throw {message: "Username is taken. Please enter a different username."};
      }    
  
      const user_update = await user.update(
        {
          username,
        },
        {
          where: {
            email: req.user.email,
          },
        },
      );
  
      if(!user_update) {
        console.log("Error in updating username");
        throw {message: "Error in updating username"};
      }
      
      const user_instance = await user.findOne({
        where: {
          email: req.user.email,
        },
      });
      return res.status(200).json({
        user_instance
      });
      
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  };