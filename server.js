'use strict';

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const request = require('request');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // limit each IP to 100 requests per windowMs
});
const port = 4002;

const cors = require('cors')

const mailer = require('./config/nodemailer');

const app = express();
const Mailchimp = require('mailchimp-api-v3');

const mailchimpApiKey = 'a23c7b075563688dc43bd65435ad6bba-us18';
const mailchimp = new Mailchimp(mailchimpApiKey);

const corsOptions = {
  origin:'*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(helmet());
app.use(helmet.frameguard({ action: 'sameorigin' }))
app.use(helmet.hidePoweredBy({
  setTo: 'PHP 4.2.0'
}));
// app.use(helmet.hidePoweredBy({
//   setTo: 'PHP 4.2.0',
// }));

app.disable('x-powered-by');
app.use(compression());
app.use(cookieParser());

// Put these statements before you define any routes.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(`${__dirname}/web/public`)));
console.log(`${__dirname}`);
app.use('*', (req, res, next) => {
  console.log(`URL: ${req.baseUrl}`);
  next();
});
app.use(cors(corsOptions));
app.options('*', cors());

// app.get('/*', (req, res, next) => {

//   if (req.url.indexOf('/images/') === 0 || req.url.indexOf('/stylesheets/') === 0) {
//     res.setHeader('Cache-Control', 'public, max-age=2592000');
//     res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
//   }
//   next();
// });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,X-access-token');
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    res.send(err);
  }
});

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/index.html`));
});

app.get('/about-us', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/who-we-are.html`));
});

app.get('/sitemap.xml', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/sitemap.xml`));
});

app.get('/case-studies', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies.html`));
});

app.get('/quillhash-labs', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/quillhash-labs.html`));
});

app.get('/newsletter', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/newsletter.html`));
});

app.get('/careers', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/careers.html`));
});

app.get('/portfolio', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/portfolio.html`));
});

app.get('/case-studies/evolution-of-healthcare-industry', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies/healthcare.html`));
});

app.get('/case-studies/wine-track-and-trace', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies/wine-track-trace.html`));
});

app.get('/case-studies/crowd-funding-platform', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies/croud-funding.html`));
});

app.get('/case-studies/shrimp-supply-chain-traceability', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies/shrimp-supply.html`));
});

app.get('/case-studies/decentralized-marketplace', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies/decentralized-marketplace.html`));
});

app.get('/case-studies/tokenizing-assets-on-hyperledger-fabric', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/case-studies/tokenizing-assets.html`));
});

app.get('/clients-and-partners', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/partners-clients.html`));
});

app.get('/blockchain-portfolio', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/blockchain-portfolio.html`));
});
app.get('/blockchain-services', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services.html`));
});
app.get('/blockchain-industries', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries.html`));
});

/** Blockchain section starts */


app.get('/blockchain-consulting', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/blockchain-consultancy.html`));
});

app.get('/ethereum-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/ethereum-development.html`));
});


app.get('/quorum-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/quorum-development.html`));
});


app.get('/eos-blockchain-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/eos-development.html`));
});

app.get('/crypto-wallet-company', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/cryptocurrency-development.html`));
});

app.get('/cryptocurrency-exchange-software', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/exchange-development.html`));
});

app.get('/cryptocurrency-payment-gateway', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/crypto-payment.html`));
});

app.get('/blockchain-game-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/game-development.html`));
});



app.get('/zrx-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/0x-protocol-development.html`));
});

app.get('/non-fungible-tokens', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/nft-development.html`));
});

app.get('/stellar-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/stellar-development.html`));
});



app.get('/hyperledger-fabric-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/hyperledger-fabric-development.html`));
});

app.get('/hyperledger-development-services', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/hyperledger-service.html`));
});

app.get('/hyperledger-sawtooth-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/hyperledger-sawtooth-development.html`));
});


app.get('/stablecoin-development', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/stablecoin-development.html`));
});

app.get('/proof-of-concept', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/poc-development.html`));
});

// app.get('/blockchain/hashgraph-development', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/blockchain/hashgraph-development.html`));
// });


// app.get('/blockchain/cardano-development', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/blockchain/cardano-development.html`));
// });




app.get('/blockchain-deployment', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/services/blockchain-deployment.html`));
});


// app.get('/blockchain/bigchainDb-development', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/blockchain/bigchaindb-development.html`));
// });


app.get('/blockchain-art-authentication', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/art.html`));
});


app.get('/blockchain-intellectual-property-rights', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/iprights.html`));
});


app.get('/blockchain-supply-chain', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/supplychain.html`));
});

app.get('/blockchain-decentralised-financial-markets', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/financial-markets.html`));
});

app.get('/blockchain-loyalty-program', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/retail.html`));
});

app.get('/blockchain-in-healthcare', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/healthcare.html`));
});

app.get('/blockchain-for-telecom', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/telecom.html`));
});

app.get('/blockchain-decentralised-music', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/music.html`));
});

app.get('/products/distributed-non-fungible-tokens', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/blockchain/distributed-non-fungible-tokens.html`));
});


/** Blockchain section ends */


/** Cryptocurrency section starts */

// app.get('/cryptocurrency/wallet-development', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/cryptocurrency/wallet-development.html`));
// });

// app.get('/cryptocurrency/exchange-development', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/cryptocurrency/wallet-development.html`));
// });

// app.get('/cryptocurrency/dex-development', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/cryptocurrency/wallet-development.html`));
// });

/** Cryptocurrency section ends */

/** sto section starts */

// app.get('/security-tokens-offerings', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/sto/security-tokens-offerings.html`));
// });

// app.get('/security-tokens-offerings-1', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/sto/security-tokens-offerings-1.html`));
// });

// app.get('/security-token/sto2', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/sto/sto2.html`));
// });

// app.get('/security-token/sto3', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/sto/sto3.html`));
// });

// app.get('/security-token/sto4', (req, res, next) => {
//   res.sendFile(path.resolve(`${__dirname}/web/public/sto/sto4.html`));
// });

/** sto section ends */

/** industries section starts */

app.get('/industries/blockchain-in-telecom', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/telecom.html`));
});

app.get('/industries/blockchain-in-music', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/music.html`));
});

app.get('/industries/blockchain-in-healthcare', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/healthcare.html`));
});

app.get('/industries/blockchain-in-retail', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/retail.html`));
});

app.get('/industries/blockchain-in-transport', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/transport.html`));
});

app.get('/industries/blockchain-in-supply-chain-and-iot', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/supplychainiot.html`));
});

app.get('/industries/blockchain-in-cold-supply-chain', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/industries/coldsupplychain.html`));
});

/** industriy section ends */



app.get('/news', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/news.html`));
});

app.get('/privacy-policy', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/web/public/privacy-policy.html`));
});


app.get('/robots.txt', (req, res, next) => {
  res.sendFile(path.resolve(`${__dirname}/robots.txt`));
});

const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateData = (req, res, next) => {
  if (req.body.email) {
    if (!validateEmail(req.body.email)) {
      return res.status(200).json({
        success: false,
        message: 'Email is invalid'
      });
    }
  }

  if (!req.body.name) {
    return res.status(200).json({
      success: false,
      message: 'Name is missing'
    });
  } else if (!req.body.email) {
    return res.status(200).json({
      success: false,
      message: 'Email is missing'
    });
  } else if (!req.body.message) {
    return res.status(200).json({
      success: false,
      message: 'Message is missing'
    });
  } else if (!req.body.captcha) {
    return res.status(200).json({
      success: false,
      message: 'Captcha is missing'
    });
  } else {
    return next();
  }

};

const validateContactusData = (req, res, next) => {
  
  console.log('req.body : ', req.body);
  console.log('req.query : ', req.query);


  if (!req.body.email) {
    return res.status(200).json({
      success: false,
      message: 'Email... is missing'
    });
  } else if (!req.body.message) {
    return res.status(200).json({
      success: false,
      message: 'Message is missing'
    });
  } else if (!req.body.service) {
    return res.status(200).json({
      success: false,
      message: 'Service is missing'
    });
  } else if (!req.body.name) {
    return res.status(200).json({
      success: false,
      message: 'name is missing'
    });
  } else {
    return next();
  }
};


const removeFalsy = (req, res, next) => {
  // console.log("--------------------------",req.body);

  const newObj = {};
  Object.keys(req.body).forEach((prop) => {

      if (typeof req.body[prop] == 'boolean') { // in case of boolean values, do not remove 'false' value
          newObj[prop] = req.body[prop];
      } else if (!!req.body[prop]) { // here check for other falsy values like undefined, null, etc.
          if (typeof req.body[prop] == 'string') {
              newObj[prop] = req.body[prop].trim(); // in case of string trim values
          } else {
              newObj[prop] = req.body[prop]/*.trim()*/;
          }
      }
  });
  req.body = newObj;

  // check for stringified 'undefined' in query parameters
  Object.keys(req.query).forEach(prop => {
      if (req.query[prop] == 'undefined') {
          req.query[prop] = undefined;
      }
  });
  return next();
};

const validateContactusData2 = (req, res, next) => {
  

  if (!req.body.name || !req.body.email || !req.body.role || !req.body.linkedin || !req.body.shareurl ) {
    return res.status(200).json({
      success: false,
      message: 'Required Data is missing'
    });
  } else {
    return next();
  }
};

const validateInvest = (req, res, next) => {
  

  if (!req.body.email || !req.body.name || !req.body.investment || !req.body.nationality || !req.body.networth || !req.body.phone  ) {
    return res.status(200).json({
      success: false,
      message: 'Required Data is missing'
    });
  } else {
    return next();
  }
};

const validateSubscribeData = (req, res, next) => {
  if (req.body.email) {
    if (!validateEmail(req.body.email)) {
      return res.status(200).json({
        success: false,
        message: 'Email is invalid'
      });
    }
  }

  if (!req.body.email) {
    return res.status(200).json({
      success: false,
      message: 'Email is missing'
    });
  } else {
    return next();
  }
}

let checkCaptcha = (req, res, next) => { // eslint-disable-line
  // if (req.app.get('env') === 'development') {
  //   return next();
  // }

  const isIpad = !!req.headers['user-agent'].match(/iPad/);
  const isAndroid = !!req.headers['user-agent'].match(/Android/);
  const isWindows = !!req.headers['user-agent'].match(/Windows/);
  const isIphone = !!req.headers['user-agent'].match(/Iphone/);
  const isMac = !!req.headers['user-agent'].match(/Macintosh/);
  let message;
  if (isWindows) {
    message = 'Please verify that you are not a robot. If you are unable to reCaptcha, please press Ctrl+R';
  }
  else if (isAndroid) {
    message = 'Please verify that you are not a robot. If you are unable to see reCaptcha, please reload the site';
  }
  else if (isIpad) {
    message = 'Please verify that you are not a robot. If you are unable to see reCaptcha, please reload the site';
  }
  else if (isMac) {
    message = 'Please verify that you are not a robot. If you are unable to see reCaptcha, please press Command+R';
  }
  else if (isIphone) {
    message = 'Please verify that you are not a robot. If you are unable to see reCaptcha, please reload the site';
  }
  else {
    message = 'Please verify that you are not a robot. If you are unable to see reCaptcha, please reload the site';
  }


  request.post({
    url: 'https://www.google.com/recaptcha/api/siteverify',
    form: {
      secret: '6LcHp2QUAAAAAOcqD_uyCPlJjsLhMutxHh8s6lkN',
      response: !!req.body.data ? req.body.data.captcha : req.body.captcha,
      remoteip: req.ip
    }
  },
    (err, httpResponse, body) => { /* ... */
      if (err) {
        console.log(req.headers['user-agent']);
        return res.status(200).json({
          success: false,
          message: message
        });
        //return next(boom.badImplementation(err));
      }
      else {
        const resData = JSON.parse(body);
        if (resData.success) {
          return next();
        } else {
          return res.status(200).json({
            success: false,
            message: message
          });
        }
      }

    });

};


app.post('/api/v1/contactus',limiter,removeFalsy, validateContactusData, (req, res, next) => {
  console.log('req.body : ', req.body);
  try {
    const name = req.body.name,
      service = req.body.service,
      message = req.body.message,
      email = req.body.email

    mailer({
      mailType: 'CONTACT_US',
      to: 'leads@quillhash.com',
      data: {
        name,
        service,
        message,
        email
      }
    });
    res.status(200).json({
      success: true,
      message: 'Thank you for the information. One of our team members will get back to you in a jiffy!.'
    });
  } catch (error) {
    console.log('ERROR in contact us : ', error);
    res.status(200).json({
      success: false,
      message: 'Server issue.'
    });
  }
});

app.post('/api/v1/apply',limiter,removeFalsy, validateContactusData2, (req, res, next) => {
  console.log('req.body : ', req.body);
  try {
    const name = req.body.name,
    email = req.body.email,
    role = req.body.role,
    linkedin = req.body.linkedin,
    shareurl = req.body.shareurl; 

    
    mailer({
      mailType: 'APPLY_US',
      to: 'hr@quillhash.com',
      data: {
        name,
        email,
        role,
        linkedin,
        shareurl
      }
    });
    res.status(200).json({
      success: true,
      message: 'Thank you for the information. One of our team members will get back to you in a jiffy!'
    });
  } catch (error) {
    console.log('ERROR in contact us : ', error);
    res.status(200).json({
      success: false,
      message: 'Server issue. , Please try after some time'
    });
  }
});


app.post('/api/v1/invest',limiter,removeFalsy, validateInvest, (req, res, next) => {
  console.log('req.body : ', req.body);
  try {
    const name = req.body.name,
    email = req.body.email,
    investment = req.body.investment,
    nationality = req.body.nationality,
    networth = req.body.networth,
    phone = req.body.phone;

    
    mailer({
      mailType: 'INVEST_US',
      to: 'rajat@quillhash.com',
      data: {
        name,
        email,
        investment,
        nationality,
        networth,
        phone
      }
    });
    res.status(200).json({
      success: true,
      message: 'Thank you for the information. One of our team members will get back to you in a jiffy!'
    });
  } catch (error) {
    console.log('ERROR in contact us : ', error);
    res.status(200).json({
      success: false,
      message: 'Server issue. , Please try after some time'
    });
  }
});



app.post('/subscribe',limiter,removeFalsy, validateSubscribeData, async (req, res, next) => {
  try {
    const subscribedCall = await mailchimp.post(`lists/367a643603`, {
      update_existing: true,
      members: [{
        email_address: (req.body.email).toLowerCase(),
        status_if_new: 'subscribed',
        merge_fields: {
          "FNAME": req.body.email
        },
      }],
    });

    if (subscribedCall.statusCode === 200) {
      // console.log('Response adding new subscriber', subscribedCall);
      // Checking for new subscriber
      if ((subscribedCall.new_members).length > 0) {
        // console.log('Subscribed : ', subscribedCall);
        return res
          .status(200)
          .json({
            success: true,
            message: 'Subscribed.'
          });
      } else if ((subscribedCall.updated_members).length > 0) {
        console.log('Already Subscribed : ', subscribedCall);
        return res
          .status(200)
          .json({
            success: true,
            message: 'Already Subscribed.'
          });
      }

    } else {
      // console.log('Unable to subscribe', subscribedCall);
      return res
        .status(200)
        .json({
          success: false,
          message: 'Unable to subscribe'
        });
    }
  } catch (error) {
    console.warn('Error adding subscriber', error);
    return res
      .status(200)
      .json({
        success: false,
        message: 'Server Issue'
      });
  }
})

app.post('/cabinet_contact',limiter, validateData, checkCaptcha, (req, res, next) => {
  try {
    const name = req.body.name,
      email = req.body.email,
      message = req.body.message;
    mailer({
      mailType: 'CONTACT_TOKENSALE',
      to: 'hello@quillhash.com',
      data: {
        name,
        email,
        message
      }
    });
    res.status(200).json({
      success: true,
      message: 'Our team will respond to you soon.'
    });

  } catch (err) {
    console.log(err);
    res.status(200).json({
      success: false,
      message: 'Something went wrong.'
    });
  }
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
  res.status(404);
  res.sendFile(path.resolve(`${__dirname}/web/public/404.html`));
});

app.listen(port)
  .on('error', error => {
    // logger.error(error);
    console.log(error);
  })
  .on('listening', () => {
    console.log(`Express listening on ${port}`);
    // logger.info(`Express listening on ${port}`);
  });
