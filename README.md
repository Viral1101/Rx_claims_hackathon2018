# Prescription Drug Claims Analysis
## 1,3,7-Trimethylxanthine

[![Build Status](https://travis-ci.org/h5bp/html5-boilerplate.svg)](https://travis-ci.org/h5bp/html5-boilerplate)
[![devDependency Status](https://david-dm.org/h5bp/html5-boilerplate/dev-status.svg)](https://david-dm.org/h5bp/html5-boilerplate#info=devDependencies)

This purpose of this project is to understand and predict drug usage of the Medicaid population, which will enable local governments and health plan providers to respond strategically to reduce expenditures.

* Source: [Github Repository](https://github.com/Viral1101/Rx_claims_hackathon2018)

## Requirements

The following features were required for this project:
1. Combine datasets for analysis
2. Analyze and visualize interesting patterns in the data.
3. Future prediction of prescription usage by state or zip cod.

## Datasets

* [Medicaid Claims](https://www.medicaid.gov/medicaid/prescription-drugs/state-drug-utilization-data/index.html)
* [National Drug Codes](https://www.ncqa.org/hedis/measures/hedis-2019-ndc-license/hedis-2019-final-ndc-lists/)

The *Medicaid Claims* dataset includes the information states have reported on drug utilization for covered outpatient drugs paid for by state Medicaid agencies. 

The *National Drug Codes* dataset is from the Healthcare Effectiveness Data and Information Set (HEDIS), published by the National Committee for Quality Assurance (NCQA). The lists used are referred to as the Medication List Directory (MLD). The MLD includes medications listed by National Drug Code, which correspond to claims information in the Medicaid dataset.

## Features

* HTML5 ready. Use the new elements with confidence.
* Designed with progressive enhancement in mind.
* Includes:
  * [`Normalize.css`](https://necolas.github.com/normalize.css/)
    for CSS normalizations and common bug fixes
  * [`jQuery`](https://jquery.com/) via CDN with [SRI Hash](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) and a local fallback
  * A custom build of [`Modernizr`](https://modernizr.com/) for feature
    detection
  * [`Apache Server Configs`](https://github.com/h5bp/server-configs-apache)
    that, among other, improve the web site's performance and security
* Placeholder CSS Media Queries.
* Useful CSS helper classes.
* Default print styles, performance optimized.
* An optimized version of the Google Universal Analytics snippet.
* Protection against any stray `console` statements causing JavaScript
  errors in older browsers.
* "Delete-key friendly." Easy to strip out parts you don't need.
* Extensive inline and accompanying documentation.

## Documentation

Take a look at the [documentation table of contents](dist/doc/TOC.md).
This documentation is bundled with the project which makes it 
available for offline reading and provides a useful starting point for
any documentation you want to write about your project.


## Contributing

Hundreds of developers have helped to make the HTML5 Boilerplate. Anyone is welcome to [contribute](.github/CONTRIBUTING.md),
however, if you decide to get involved, please take a moment to review
the [guidelines](.github/CONTRIBUTING.md):

* [Bug reports](.github/CONTRIBUTING.md#bugs)
* [Feature requests](.github/CONTRIBUTING.md#features)
* [Pull requests](.github/CONTRIBUTING.md#pull-requests)


## License

The code is available under the [MIT license](LICENSE.txt).
