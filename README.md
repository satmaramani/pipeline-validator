
# pipeline-validator

Pipeline Validator is a robust YAML validation tool designed to ensure the correctness of your GitHub Actions pipeline configurations. It verifies that your pipeline files are named correctly, contain all required sections, and adhere to GitHub's schema for triggers and jobs. With detailed error reporting, it provides precise feedback on missing or invalid triggers, properties, and required sections. This package helps streamline CI/CD workflows by catching configuration issues early, ensuring your pipelines are well-formed and ready for execution. Enhance your development workflow with reliable, clear, and actionable validation insights.



## Installation

```bash
    npm install pipeline-validator
```

#### Example Usage Code from client repo considering deeply-nested.yaml file below as a source yaml contents 

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

#### Valid Pipeline (sample-pipeline.yaml)

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

#### Add a License

Create a `LICENSE` file with your chosen license. For example, the MIT License:

```plaintext
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so

