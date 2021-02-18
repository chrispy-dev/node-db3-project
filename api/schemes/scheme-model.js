const db = require('../../data/db-config');

const find = () => {
    return db('schemes');
};

const findById = (id) => {
    return db('schemes')
        .where({ id: id })
        .first()
        .then(scheme => {
            if(!scheme) {
                return Promise.resolve(null);
            } else {
                return scheme;
            }
        })
};

const findSteps = (id) => {
    return db('schemes')
        .where({ id: id })
        .then(scheme => {
            const sc = scheme[0];
            return db('steps as s')
                .where('s.scheme_id', id)
                .select('s.id', 's.step_number', 's.instructions')
                .then(steps => {
                    return {
                            id: sc.id,
                            name: sc.scheme_name,
                            steps: steps
                        }
                })
        })
};

const add = (scheme) => {
    return db('schemes')
        .insert(scheme)
        .then(id => {
            console.log(id);
            return db('schemes')
                .where({ id: id })
                .first();
        })
        .catch(err => console.log(err));
};

const update = (changes, id) => {
    return db('schemes')
        .where({ id: id })
        .first()
        .update(changes);
};

const remove = (id) => {
    return db('schemes')
        .where({ id: id })
        .del();
};

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};