const CracoLessPlugin = require('craco-less');
const { loaderByName } = require("@craco/craco");

module.exports = {
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            modifyLessModuleRule(lessModuleRule) {
              // Configure the file suffix
              lessModuleRule.test = /.module.less$/;
    
              // Configure the generated local ident name.
              console.log(lessModuleRule);
              const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
              cssLoader.options.modules = {
                localIdentName: "[local]_[hash:base64:5]",
              };
    
              return lessModuleRule;
            },
          },
        },
      ],
};