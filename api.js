const express = require("express");
var cluster = require("cluster");
var bodyParser = require("body-parser");
require("dotenv").config();
const axios = require('axios');

const authorize = async (shop) => {
  console.log("shop");
  return encodeURI(
    `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.client_id}&scopes=${process.env.scopes}&redirect_uri=${process.env.redirect_uri}`
  );
};

const redirect = async (code, shop) => {
  let shopifyOauthUri = `https://${shop}/admin/oauth/access_token?client_id=${process.env.client_id}&client_secret=${process.env.client_secret}&code=${code}`;

  const { data } = await axios({
    url: shopifyOauthUri,
    method: "post",
    data: {},
  })
    .then((response) => {
        console.log(response)
      return response;
    })
    .catch((error) => {
        console.log(error)

      return error;
    });

    return data;
};

var port = 4000;

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.listen(port);
app.get("/api/shopify/authorize", async (req, res) => {
  console.log(req.query.shop, "shop query");
  return res.redirect(await authorize(req.query.shop));
});

app.get("/api/shopify/redirect", async (req, res) => {
  return res.json(await redirect(req.query.code, req.query.shop));
});
