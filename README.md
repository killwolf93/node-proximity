# Proximity Code Challenge 

## Usage

### run
```bash
npm run start
```

Inside `postman` folder is the postman collection to import in your postman.

example file added in `examples/`

One endpoint `upload` that will receive 2 parameters : `file` and `provider`

Current possible provider names: `['superCar','proxiCar']` any other provider column layout can be added in [config/providers.js](/config/providers.js)

Example request:
```
file:superCar.csv
provider:superCar
```

File to test with `proxiCar` provider downladed from https://data.world/data-society/used-cars-data is a 68.4MB file so wasn't added in the repo. 


Note: the file name is not relevant but is used as an example to make the tests easier.

### test
run 
 ```bash
 npm run test
 ```       

### Improving Space (TO DO)

- Add a middleware to log incoming requests on the server.
- Refactor validator middleware to use external library to perform validations (like joi)


#### Assumptions

There's no need to validate between the uploaded file and, the provider supplied to check if config map matches content on csv (If doesn't match the documents will be created with only the fields that matches the config).

The uploaded file needs to be stored in the server as backup.

### Andrés Mata 
