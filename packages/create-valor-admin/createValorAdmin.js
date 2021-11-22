'use strict';

const https = require('https');
const chalk = require('chalk');
const commander = require('commander');
const dns = require('dns');
const envinfo = require('envinfo');
const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const hyperquest = require('hyperquest');
const prompts = require('prompts');
const os = require('os');
const path = require('path');
const semver = require('semver');
const licenseKey = require('licensekey');
const spawn = require('cross-spawn');
const tmp = require('tmp');
const unpack = require('tar-pack').unpack;
const url = require('url');
const validateProjectName = require('validate-npm-package-name');
const enquirer = require('enquirer');

const packageJson = require('./package.json');

function init() {
    // 1. step write file create folder (empty or with base thing)
    // const root = path.resolve('valor-launchpad');
    // const appName = path.basename(root);
    // fs.ensureDirSync('valor-launchpad');
    // const packageJson = {
    //     name: 'valor-launchpad',
    //     version: '0.1.0',
    //     private: true,
    // };
    // fs.writeFileSync(
    //     path.join(root, 'package.json'),
    //     JSON.stringify(packageJson, null, 2) + os.EOL
    // );
    // process.chdir(root);

    // get code
    // execSync('git clone git@github.com:valor-software/valor-launchpad.git',function(err,stdout,stderr) {
    //     console.log(stdout);
    //     console.log(1111111);
    //     console.log(stderr);
    //     if (err) {
    //         console.log(err);
    //     }
    // });

    //2step valid liscese
    validLiscese();
}

function askProductPermalink() {      
    return enquirer
      .prompt([
        {
          name: 'product_permalink',
          message: `product permalink    `,
          type: 'input',
        },
      ])
      .then((a) => {
        if (!a.product_permalink) {
          output.error({
            title: 'Invalid product permalink',
            bodyLines: [`product permalink cannot be empty`],
          });
          process.exit(1);
        }
        return a.product_permalink;
      });
}

function askLicenseKey() {  
    return enquirer
      .prompt([
        {
          name: 'license_key',
          message: `License key                   `,
          type: 'input',
        },
      ])
      .then((a) => {
        if (!a.license_key) {
          output.error({
            title: 'Invalid license',
            bodyLines: [`Licsnse key be empty`],
          });
          process.exit(1);
        }
        return a.license_key;
      });
}

async function validLiscese() {
    try {
        const productPermalink = await askProductPermalink();
        const licenseKey = await askLicenseKey();
    
        // valid liscese with gumroad
        execSync(`curl https://api.gumroad.com/v2/licenses/verify \
        -d "product_permalink=${productPermalink}" \
        -d "license_key=${licenseKey}" \
        -X POST`,function(err,stdout,stderr) {
            console.log(stdout);
            console.log(stderr);
            if(err) {
                console.error(err);
            }
        })

        return {
            productPermalink,
            licenseKey
        };
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
}

// create liscese keep ? 
// async function getLiscese() {
//     const name = await askProductPermalink();
//     const userInfo = {company:name,street:"123 licenseKey ave", city:"city/town", state:"State/Province", zip:"postal/zip"};
//     const userLicense = {
//         info: userInfo,
//         prodCode: 'LEN100120',
//         appVersion: '1.5',
//         osType: 'IOS8'
//     };

//     try{
//         const license = licenseKey.createLicense(userLicense)
//         console.log(license);
//     }catch(err){
//         console.log(err);
//     }
// } 

module.exports = {
    init
};
