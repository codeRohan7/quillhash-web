const ejs = require('ejs'),
  Path = require('path');

const mailfileMap = {
  'CONTACT_ORION' : {
    htmlFileName : 'contact_orion.js',
    subject: 'Orion Stride - Contact US'
  },
  'CONTACT_TOKENSALE': {
    htmlFileName: 'contact_tokensale.js',
    subject: 'ICO CABINET - Contact US'
  },
  'CONTACT_US': {
    htmlFileName: 'contactus.js',
    subject: 'New client Query from Quillhash main website'
  },
  'APPLY_US': {
    htmlFileName: 'apply_us.js',
    subject: 'New candidate applied on career page'
  },
  'INVEST_US': {
    htmlFileName: 'invest_us.js',
    subject: 'New investment enquiry on page'
  },
  'CONTACT_US_NEW_PROJECT': {
    htmlFileName: 'contactUsStartNewProject.js',
    subject: 'Contact US: Start new project'
  }
};


module.exports = ({ mailType,data })=>{
  const mailData = mailfileMap[mailType];
  const ejsData = require(Path.join(__dirname,mailData.htmlFileName)); //Path.join(__dirname,mailData.htmlFileName);
  let htmlStr = ejs.render(ejsData.htmlString, data, {});
  // ,
  //   textStr = ejs.render(ejsData.textString, data, {});

  return {
    html : htmlStr,
    subject : mailData.subject
    // ,
    // text : textStr
  };

};
