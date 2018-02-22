const objection = require('objection');
const Model = objection.Model;

class Users extends Model {

    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const Progress = require('./progress');

        return {
            progressList: {
                relation: Model.HasManyRelation,
                modelClass: Progress,
                join: {
                    from: 'user.id',
                    to: 'progress.user_id'
                }
            }
        }
    }
}

module.exports = Users;