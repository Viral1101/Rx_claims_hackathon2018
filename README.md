# Prescription Drug Claims Analysis
## 1,3,7-Trimethylxanthine

The purpose of this project is to understand and predict drug usage of the Medicaid population, which will enable local governments and health plan providers to respond strategically to reduce expenditures.

* Source Code: [Github Repository](https://github.com/Viral1101/Rx_claims_hackathon2018)
* Presentation: [Slides](https://docs.google.com/presentation/d/161zXyUf1gQDV95C6VQlIDrQCJhbf6KNRCBGZd8pqHtQ/edit?usp=sharing)
* Video: [Youtube](https://www.youtube.com/watch?v=Z4ZtlFfPu0M&feature=youtu.be)

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
SQL code was used to join the two tables for more responsive use by the application, according to the following code.

```
import State_Drug_Utilization_Data_2018.csv as medicaid
import ndc_med_list.csv as ndcmed
```

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

Relevant tables from the datasets were imported into MongoDB. Database queries return data on Medicaid prescription expenditures by state and product. This data is accessed by and displayed to the user through an interactive front-end using D3.

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

The US Map visualization was based on an example published on the D3 Github Gallery:
[Zoomable Map](https://bl.ocks.org/mbostock/2206590)

Our donut chart visualization was also based on an example published on the D3 Github Gallery:
[Pie Chart with Labels](http://bl.ocks.org/dbuezas/9306799)

MEAN stack application is based on previous code given in CSS5590_490 ICP.

State_Drug_Utilization_Data_2018.csv: [Medicaid](https://www.medicaid.gov/medicaid/prescription-drugs/state-drug-utilization-data/index.html)

ndc_med_list.csv: Tab 3 from [Hedis](https://www.ncqa.org/hedis/measures/hedis-2019-ndc-license/hedis-2019-final-ndc-lists/)

## Runtime requirements
*MongoDB insllation
  *mongoimport --db medicaid --collection prescriptions --type csv --headerline --file PATH\TO\FILE\State_Drug_Utilization_Data_2018.csv
  *mongoimport --db medicaid --collection ndcpres --type csv --headerline --file PATH\TO\FILE\medList_by_state.csv
*Node.js
  *run mongo.js before launching web app

## Contributing Members

* [Dave Walsh](https://github.com/Viral1101)
* [Trinadha Muppala](https://github.com/rmuppala)
* [Hari Velivela](https://github.com/Githubhari9966)
* [Neil Pirch](https://github.com/neilpirch)

