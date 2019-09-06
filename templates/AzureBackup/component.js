var validateRequired = require('../../validator').validateRequired;

module.exports = function (plop) {
    plop.load('../../actionTypes.js');
    plop.setHelper('is', function (arg1, arg2, opts) {
        if (arg1 == arg2) {
            return opts.fn(this)
        } else {
            return opts.inverse(this)
        }
    });
    plop.setGenerator('Azure Backup', {
        description: 'This module generates ARM template file for a Azure Backup',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the template name?',
                validate: validateRequired
            },
            {
                type: 'list',
                name: 'backupPolicy',
                default: 0,
                message: 'What kind of backup do you want?',
                choices: ["Daily", "Weekly"],
            },
            {
                type: 'confirm',
                name: 'isDiagnosticsEnabled',
                default: false,
                message: 'Do you want to enable diagnostics?',
            },
            {
                type: 'confirm',
                name: 'useStorageAccountForDiagnostics',
                default: false,
                message: 'Do you want to use a storage account for diagnostics?',
                when: function (answers) {
                    return answers.isDiagnosticsEnabled;
                }
            },
            {
                type: 'confirm',
                name: 'existingStorageForDiagnostics',
                default: false,
                message: 'Do you want to use an existing storage account for diagnostics?',
                when: function (answers) {
                    return answers.isDiagnosticsEnabled && answers.useStorageAccountForDiagnostics;
                }
            },
            {
                type: 'confirm',
                name: 'useLogAnalyticsForDiagnostics',
                default: false,
                message: 'Do you want to use Log Analytics for diagnostics?',
                when: function (answers) {
                    return answers.isDiagnosticsEnabled;
                }
            },
            {
                type: 'confirm',
                name: 'existingLogAnalyticsForDiagnostics',
                default: false,
                message: 'Do you want to use an existing workspace?',
                when: function (answers) {
                    return answers.isDiagnosticsEnabled && answers.useLogAnalyticsForDiagnostics;
                }
            }
        ], // array of inquirer prompts
        actions: [
            {
                type: "add",
                path: "generated/{{name}}.json",
                templateFile: "./azuredeploy.json"
            },
            {
                type: "add",
                path: "generated/{{name}}.parameters.json",
                templateFile: "./azuredeploy.parameters.json"
            },
            {
                type: "printHelpDeployment"
            }
        ] // array of actions
    });
}