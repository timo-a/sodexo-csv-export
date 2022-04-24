const path = require("path");

module.exports = {
    entry: {
        content_scripts: "./src/content_scripts/sodexo-de-benefits.js"
    },
    output: {
        path: path.resolve(__dirname, "addon"),
        filename: "[name]/index.js"
    }
};
