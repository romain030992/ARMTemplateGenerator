var validateRequired = require('../../validator').validateRequired;
var actionTypes = require('../../actionTypes');

module.exports.generatorName = 'Storage Account';
module.exports.generator = {

    description: 'This module generates ARM template file for a Storage Account',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is the template name?',
            validate: validateRequired
        },
        {
            type: 'confirm',
            name: 'enableHns',
            default: false,
            message: 'Do you want to enable the hierarchical namespace (Azure Data Lake Storage Gen2)?'
        },
        {
            type: 'confirm',
            name: 'createContainers',
            default: false,
            message: 'Do you want to create containers?',
            when: function (answers) {
                return !answers.enableHns;
            }
        },
        {
            type: 'confirm',
            name: 'createFileshares',
            default: false,
            message: 'Do you want to create file shares?',
            when: function (answers) {
                return !answers.enableHns;
            }
        },
        {
            type: 'confirm',
            name: 'enableFirewall',
            default: false,
            message: 'Do you want to enable firewall?'
        },

    ], // array of inquirer prompts
    actions: actionTypes.DEFAULT_ACTIONS(__dirname)
};