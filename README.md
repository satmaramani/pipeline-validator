
# YAML Validator and Github actions pipeline validator

Pipeline Validator is a robust YAML validation tool designed to ensure the correctness of your GitHub Actions pipeline configurations. It verifies that your pipeline files are named correctly, contain all required sections, and adhere to GitHub's schema for triggers and jobs. With detailed error reporting, it provides precise feedback on missing or invalid triggers, properties, and required sections. This package helps streamline CI/CD workflows by catching configuration issues early, ensuring your pipelines are well-formed and ready for execution. Enhance your development workflow with reliable, clear, and actionable validation insights.



## Installation of the package 

```bash
    npm install pipeline-validator
```

#### create one javascript file ex. "pipeline-validator.js"

#### Copy below example code in "pipeline-validator.js" file 

```plaintext
    
const {validatePipeline} = require("pipeline-validator");

// Example usage
const filePath = 'sample-pipeline.yaml';
const result = validatePipeline(filePath);

if (result.valid) {
    console.log(result.message);
} else {
    console.error('Validation failed with the following errors:');
    result.errors.forEach(error => console.error(`- ${error}`));
}


```


# Valid Pipeline 

#### Create pipeline file to check ("sample-pipeline.yaml")

```
name: My Sample Pipeline
description: This is test pipeline description 
on:
  workflow_dispatch:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

```

### Run the following command (Below command will run the validation code)

```plaintext

node pipeline-validator.js

```

# Screenshot If pipeline is valid 

![Correct Pipeline]( https://raw.githubusercontent.com/satmaramani/pipeline-validator/master/images/success1.png )


# Screenshot If pipeline is invalid - 1

![Wrong Pipeline]( https://raw.githubusercontent.com/satmaramani/pipeline-validator/master/images/fail1.png )

# Screenshot If pipeline is invalid - 2

![Wrong Pipeline]( https://raw.githubusercontent.com/satmaramani/pipeline-validator/master/images/fail2.png )

# Screenshot If pipeline is invalid - Bad Indentaion of YAML 3

![Bad Indentation]( https://raw.githubusercontent.com/satmaramani/pipeline-validator/master/images/fail_indentation3.png )



#### Invalid Pipeline 1 (missing push object element)

```
name: My Sample Invalid Pipeline
description: This is Invalid pipeline description 
on:
  push:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

```

#### Invalid Pipeline 2 (missing on keyword)

```
name: My Sample Invalid Pipeline
description: This is Invalid pipeline description 
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

```

#### Invalid Pipeline 3 (missing description and on keywords)

```
name: My Sample Invalid Pipeline
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

```

# Proprietary License


```plaintext

All rights reserved.

This software and its source code are the property of myself i.e. Sampurna Atmaramani. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited. 

For inquiries regarding the use of this software, please contact s.atmaramani@gmail.com 

```