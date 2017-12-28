const objection = require('objection');
const Model = objection.Model;

class Progress extends Model {
    static get tableName() {
        return 'progress';
    }
}

module.exports = Progress;