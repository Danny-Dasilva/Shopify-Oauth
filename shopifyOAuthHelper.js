const axios = require('axios');

const authorize=async (shop) =>{
    return encodeURI(`https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${process.env.client_id}&scope=${process.env.scope}&redirect_uri=${process.env.redirect_uri}`);
}

const redirect=async (code) =>{
    console.log(code);
}

module.exports = {
    authorize,
    redirect
}