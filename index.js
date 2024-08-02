const fs = require('fs');
const yaml = require('js-yaml');

function validatePipeline(filePath) {
    const errors = [];

    try {
        // Ensure the file name is sample-pipeline.yaml
        if (!filePath.endsWith('sample-pipeline.yaml')) {
            return { valid: false, errors: ['The file name must be sample-pipeline.yaml'] };
        }

        // Read the YAML file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        let pipeline;

        // YAML parsing error handling
        try {
            pipeline = yaml.load(fileContent);
        } catch (yamlError) {
            return { valid: false, errors: [`Error parsing YAML: ${yamlError.message}`] };
        }

        // Check if the YAML content is valid
        if (!pipeline) {
            errors.push('Invalid YAML content: Pipeline is null or undefined');
        }

        // List of all possible triggers in GitHub Actions and their valid properties
        const validTriggers = {
            check_run: [],
            check_suite: [],
            create: [],
            delete: [],
            deployment: [],
            deployment_status: [],
            fork: [],
            gollum: [],
            issue_comment: [],
            issues: [],
            label: [],
            milestone: [],
            page_build: [],
            project: [],
            project_card: [],
            project_column: [],
            public: [],
            pull_request: ['types', 'branches', 'branches-ignore', 'paths', 'paths-ignore'],
            pull_request_review: [],
            pull_request_review_comment: [],
            pull_request_target: [],
            push: ['branches', 'branches-ignore', 'tags', 'tags-ignore', 'paths', 'paths-ignore'],
            registry_package: [],
            release: [],
            repository_dispatch: [],
            schedule: ['cron'],
            status: [],
            watch: [],
            workflow_call: [], // Valid without properties
            workflow_dispatch: [], // Valid without properties
            workflow_run: []
        };

        // Check for required keys
        if (!pipeline.hasOwnProperty('on')) {
            errors.push('Missing required "on" keyword');
        } else {
            const onSection = pipeline.on;
            if (typeof onSection !== 'object' || onSection === null) {
                errors.push('The "on" section must be an object');
            } else {
                const triggers = Object.keys(onSection);
                const validTriggersList = Object.keys(validTriggers);
                
                // Check for missing valid triggers
                const hasValidTrigger = triggers.some(trigger => validTriggersList.includes(trigger));
                if (!hasValidTrigger) {
                    errors.push(`No valid triggers found in "on" section: ${JSON.stringify(onSection, null, 2)}`);
                } else {
                    for (const [trigger, properties] of Object.entries(onSection)) {
                        if (validTriggersList.includes(trigger)) {
                            if (Array.isArray(properties)) {
                                if (properties.length > 0) {
                                    errors.push(`The "${trigger}" trigger should not be an array with content`);
                                }
                            } else if (typeof properties !== 'object' || properties === null) {
                                errors.push(`The "${trigger}" trigger must be an object, it can not be empty or null`);
                            } else {
                                const validProperties = validTriggers[trigger];
                                const propertyKeys = Object.keys(properties);

                                // Check for invalid properties
                                for (const prop of propertyKeys) {
                                    if (!validProperties.includes(prop)) {
                                        errors.push(`Invalid property "${prop}" in "${trigger}" trigger`);
                                    }
                                }

                                // Check if required properties are missing
                                if (propertyKeys.length === 0 && validProperties.length > 0) {
                                    errors.push(`The "${trigger}" trigger must not be empty if it requires properties`);
                                }
                            }
                        } else {
                            errors.push(`Invalid trigger "${trigger}" in "on" section`);
                        }
                    }
                }
            }
        }

        // Validate jobs section
        if (!pipeline.hasOwnProperty('jobs')) {
            errors.push('Missing required "jobs" section');
        } else if (pipeline.jobs === null || Object.keys(pipeline.jobs).length === 0) {
            errors.push('The "jobs" section must not be null or empty');
        }

        // Validate description
        if (!pipeline.hasOwnProperty('description')) {
            errors.push('Missing required "description" section');
        }

        if (errors.length > 0) {
            return { valid: false, errors };
        }

        return { valid: true, message: 'Pipeline is valid' };
    } catch (e) {
        // General error catch block
        return { valid: false, errors: [`Unexpected error: ${e.message}`] };
    }
}

// Example usage
const filePath = 'sample-pipeline.yaml';
const result = validatePipeline(filePath);

if (result.valid) {
    console.log(result.message);
} else {
    console.error('Validation failed with the following errors:');
    result.errors.forEach((error, index) => console.error(`Error ${index + 1}: ${error}`));
}

module.exports = { validatePipeline };
