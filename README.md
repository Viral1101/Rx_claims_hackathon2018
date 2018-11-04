# Prescription Drug Claims Analysis
## 1,3,7-Trimethylxanthine

The purpose of this project is to understand and predict drug usage of the Medicaid population, which will enable local governments and health plan providers to respond strategically to reduce expenditures.

* Source: [Github Repository](https://github.com/Viral1101/Rx_claims_hackathon2018)

## Requirements

The following features were required for this project:
1. Combine datasets for analysis
2. Analyze and visualize interesting patterns in the data.
3. Predict future prescription usage by state or zip code.

## Datasets

* [Medicaid Claims](https://www.medicaid.gov/medicaid/prescription-drugs/state-drug-utilization-data/index.html)
* [National Drug Codes](https://www.ncqa.org/hedis/measures/hedis-2019-ndc-license/hedis-2019-final-ndc-lists/)

The *Medicaid Claims* dataset includes the information states have reported on drug utilization for covered outpatient drugs paid for by state Medicaid agencies. 

The *National Drug Codes* dataset is from the Healthcare Effectiveness Data and Information Set (HEDIS), published by the National Committee for Quality Assurance (NCQA). The lists used are referred to as the Medication List Directory (MLD). The MLD includes medications listed by National Drug Code, which correspond to claims information in the Medicaid dataset.

## Approach

This project is built as an interactive web application using MEAN Stack.

Relevant tables from the datasets were imported into MongoDB. Database queries return data on Medicaid prescription expenditures by state and product. This data is accessed by and displayed to the user through an interactive front-end using D3.

```sql
proc sql;
create table one as
select f.state, total_amount_reimbursed, f.number_of_prescriptions, f.ndc, e.medication_list
from medicaid f
join ndcmed e
on f.ndc = e.ndc_code;
quit;

proc sql;
create table two as
select state, sum(total_amount_reimbursed)as total_amount_reimbursed,
sum(number_of_prescriptions) as number_of_prescriptions, medication_list
from one
group by state, medication_list;
quit;
```

### Technologies
* HTML5
* CSS
  * Bootstrap
* MEAN Stack
  * MongoDB
  * Express
  * Angular
  * NodeJS
* D3

## Features

* Interactive map of the United States
  * The color of each state is dynamically generated to reflect expenditure range
  * Mouse-over tooltip wihch displays the state abbreviation and total expenditure for 2018
  * Clicking a state centers the state in the view and zooms the map
* Donut Charts with proportional data
  * Chart 1: State prescription data by number of prescriptions in each Medication List category
  * Chart 2: State prescription data by total monetary expenditure on prescriptions in each Medication List category


## Documentation




## Contributing Members

* [Dave Walsh](https://github.com/Viral1101)
* [Trinadha Muppala](https://github.com/rmuppala)
* [Hari Velivela](https://github.com/Githubhari9966)
* [Neil Pirch](https://github.com/neilpirch)

## License

The code is available under the [MIT license](LICENSE.txt).
