const {validatePipeline} = require('./index.js');
// Example usage
const filePath = 'sample-pipeline.yaml';
const result = validatePipeline(filePath);

if (result.valid) {
    console.log(result.message);
} else {
    console.error('Validation failed with the following errors:');
    result.errors.forEach(error => console.error(`- ${error}`));
}
