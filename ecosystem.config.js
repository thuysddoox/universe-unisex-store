module.exports = {
  apps: [{
    "name": "prism-buy-bloodstock-next",
    "script": "./node_modules/next/dist/bin/next",
    "args": "start -p 6000",
    "exec_mode": "cluster",
    "instances": "max",
    "env": {
      "NODE_ENV": "production"
    }
  }]
};

