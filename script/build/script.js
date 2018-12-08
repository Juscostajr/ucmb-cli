const fs = require("fs");
const inquirer = require("inquirer");
const webpack = require("webpack");
const path = require("path");
require("../../util");
let form;

inquirer
  .prompt({
    type: "list",
    name: "path",
    message: "Escolha o modelo ao qual deseja construir:",
    choices: listFolder("./src")
  })
  .then(result => {
    form = result.path;
    return inquirer.prompt({
      type: "list",
      name: "version",
      message: "Escolha o modelo ao qual deseja construir:",
      choices: listFolder(`./src/${result.path}`)
    });
  })
  .then(result => {
    webpack(
      {
        entry: `./src/${form}/${result.version}/index.ts`,
        output: {
          filename: `${form
            .toUnderscore()
            .toLowerCase()}_JQ_${result.version}.js`,
          path: path.resolve(__dirname, "../../built/")
        },
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".jsx"]
        },

        // Source maps support ('inline-source-map' also works)
        devtool: "source-map",

        // Add the loader for .ts files.
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              loader: "awesome-typescript-loader"
            }
          ]
        }
      },
      (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(stats);
          process.exit();
        }
        // Done processing
      }
    );
  });

function listFolder(path) {
  let folderList = [];
  fs.readdirSync(path).forEach(folder => {
    folderList.push(folder);
  });
  return folderList;
}
