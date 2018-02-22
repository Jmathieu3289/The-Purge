const objection = require('objection');
const Model = objection.Model;

class ProgressHistory extends Model {
    static get tableName() {
        return 'progress_history';
    }
}

module.exports = ProgressHistory;