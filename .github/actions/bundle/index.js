/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
const core = require("@actions/core");
const fs = require("fs");

const builtFiles = [{
  fileName: 'main.bundle.js',
  humanReadableName: 'Strimzi UI code bundle size:'
}];
// }, {
//   fileName: 'libs.bundle.js',
//   humanReadableName: 'Dependancy UI code bundle size:'
// }, {
//   fileName: 'styles.bundle.css',
//   humanReadableName: 'Kafka Starter App css bundle size:'
// }];

async function calculateBundle() {
  try {

    const builtBundlesFeedback = builtFiles.reduce((previousBundleText, {fileName, humanReadableName}) => {
      const fileSize =
      Math.round(
        (fs.statSync(`./dist/${fileName}`)["size"] /
          1024.0) *
          100
      ) / 100;
      return `${previousBundleText} ${humanReadableName} ${fileSize}KB\n`;
    }, '');


    core.setOutput("bundle_size", builtBundlesFeedback);
  } catch (error) {
    core.setFailed(error.message);
  }
}

calculateBundle();
