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
                    from: 'users.id',
                    to: 'progress.user_id'
                }
            },

            friends: {
                relation: Model.ManyToManyRelation,
                modelClass: Users,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'friends.requester_user_id',
                        to: 'friends.accepter_user_id'
                    },
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Users;