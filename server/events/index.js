require('fs')
  .readdirSync(__dirname)
  .map(filename => {
      if(!filename.includes(".dll")) {
        const moduleName = filename.split('.')[0];
        exports[moduleName] = require(`${__dirname}/${filename}`);
      }
  });