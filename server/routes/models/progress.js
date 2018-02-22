const objection = require('objection');
const Model = objection.Model;

class Progress extends Model {

    static get tableName() {
        return 'progress';
    }

    static get relationMappings() {
        const ProgressHistory = require('./progress_history');

        return {
            history: {
                relation: Model.HasManyRelation,
                modelClass: ProgressHistory,
                join: {
                    from: 'progress.id',
                    to: 'progress_history.progress_id'
                }
            }
        }
    }
}

module.exports = Progress;