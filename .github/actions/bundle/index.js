/*
 * Copyright Strimzi authors.
 * License: Apache License 2.0 (see the file LICENSE or http://apache.org/licenses/LICENSE-2.0.html).
 */
const core = require("@actions/core");
const fs = require("fs");

async function buildBundleReport() {
  try {
    const bundles = JSON.parse(fs.readFileSync('./generated/bundle-analyser/report.json'));

    const builtBundlesFeedback = bundles.reduce((previousbundleText, bundle) => {
      const bundleSize = Math.round((bundle.parsedSize / 1024) * 100) / 100;
      return `${previousbundleText} |${bundle.label}|${bundleSize}KB|<pre lang="diff">+hello</pre>|\n`;
    }, '|Bundle|Size|Increase/Decrease|\n|---|---|---|\n');

    let report = core.getInput("master_report");
    console.dir(report);

    core.setOutput("bundle_size", builtBundlesFeedback);
  } catch (error) {
    core.setFailed(error.message);
  }
}

buildBundleReport();
