var utils = require('../utils');
var hasOwn = {}.hasOwnProperty;

module.exports = {

  ALIPAY_PC_DIRECT_URL: 'https://mapi.alipay.com/gateway.do',

  handleCharge: function(charge) {
    var channel = charge.channel;
    var credential = charge.credential[channel];
    var baseURL = this.ALIPAY_PC_DIRECT_URL;
    if (hasOwn.call(credential, 'channel_url')) {
      baseURL = credential.channel_url;
    }

    console.log('-------',baseURL,'--------');

    if (!hasOwn.call(credential, '_input_charset')) {
      if(hasOwn.call(credential, 'service')
        && credential.service === 'create_direct_pay_by_user') {
        credential._input_charset = 'utf-8';
      }
    }
    var query = utils.stringifyData(credential, channel, true);

    console.log('-------',query,'--------');
    utils.redirectTo(baseURL + '?' + query, channel);
  }
};