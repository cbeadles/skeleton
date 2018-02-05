/* eslint-disable no-undef */
var convict = require('convict');
require('dotenv').config();

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['dev', 'stage', 'prod'],
    default: 'dev',
    arg: 'nodeEnv',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  app: {
    name: {
      doc: 'The name of the application.',
      format: String,
      default: 'The App',
      env: 'NAME',
      arg: 'name'
    }
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'server1.dev.test'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'users',
      sensitive: true,
    }
  },
  tools: {
    bulma: {
      doc: 'Include Bulma CSS framework?',
      format: 'Boolean',
      default: false
    }
  }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({allowed: 'strict'});

module.exports = config.getProperties();
