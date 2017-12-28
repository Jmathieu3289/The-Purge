const objection = require('objection');
const Model = objection.Model;

class Categories extends Model {
    static get tableName() {
        return 'categories';
    }
}

module.exports = Categories;