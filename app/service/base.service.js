const { tr } = require('voca');

exports.getAll = (Model, Order, log, attributes, condition, include) =>
  new Promise(async (resolve, reject) => {
    Model.findAll({
      attributes: attributes ? attributes : null,
      include: include ? include : null,
      order: [['id', Order]],
      where: condition ? condition : null,
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} log
 * @param {*} condition
 * @param {*} attributes
 * @param {*} include
 */
exports.paginate = (
  Model,
  page,
  itemPerPage,
  log,
  condition,
  attributes,
  include
) =>
  new Promise(async (resolve, reject) => {
    const { limit, offset } = getPagination(page, itemPerPage);

    Model.findAndCountAll({
      attributes: attributes ? attributes : null,
      include: include ? include : null,
      limit,
      offset,
      order: [['id', 'DESC']],
      where: condition,
      distinct: true,
    })
      .then((doc) => {
        let values;
        if (doc.rows.length > 0) values = getPagingData(doc, page, itemPerPage);
        else values = 'No record found.';
        resolve(values);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} values
 * @param {*} log
 */
exports.create = (Model, values, log) =>
  new Promise(async (resolve, reject) => {
    new Model(values)
      .save()
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} id
 * @param {*} log
 * @param {*} attributes
 * @param {*} include
 */
exports.show = (Model, id, log, attributes, include) =>
  new Promise(async (resolve, reject) => {
    Model.findOne({
      attributes: attributes ? attributes : null,
      include: include ? include : null,
      where: { id: id },
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} id
 * @param {*} values
 * @param {*} log
 */
exports.update = (Model, id, values, log) =>
  new Promise((resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    Model.update(values, {
      where: { id: id },
      individualHooks: true,
    })
      .then((doc) => {
        if (!doc) throw new Error('Invalid Id.');
        let responce;
        if (doc == 1) responce = true;
        else responce = false;
        resolve(responce);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} id
 * @param {*} log
 */
exports.delete = (Model, id, log) =>
  new Promise((resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));

    Model.destroy({
      where: { id: id },
    })
      .then((doc) => {
        if (!doc) throw new Error('Invalid Id.');
        let responce;
        if (doc == 1) responce = true;
        else responce = false;
        resolve(responce);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} log
 * @param {*} condition
 * @param {*} attributes
 * @param {*} include
 */
exports.search = (Model, log, condition, attributes, include) =>
  new Promise((resolve, reject) => {
    Model.findAll({
      limit: 10,
      order: [['id', 'DESC']],
      attributes: attributes ? attributes : null,
      include: include ? include : null,
      where: condition,
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} id
 * @param {*} log
 * @param {*} attributes
 * @param {*} include
 */
exports.softDelete = (Model, id, log) =>
  new Promise(async (resolve, reject) => {
    Model.findOne({
      where: { id: id },
    })
      .then(async (doc) => {
        if (!doc) throw new Error('Invalid Id.');
        await doc.update(
          {
            is_active: doc.is_active == 1 ? 0 : 1,
          },
          { individualHooks: true }
        );
        resolve(true);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} field
 * @param {*} value
 * @param {*} log
 */
exports.count = (Model, field, value, log) =>
  new Promise(async (resolve, reject) => {
    Model.count({
      where: { [field]: value },
    })
      .then((count) => resolve(count))
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} Model
 * @param {*} field
 * @param {*} value
 * @param {*} log
 */
exports.find = (Model, field, value, log) =>
  new Promise(async (resolve, reject) => {
    Model.findOne({
      where: { [field]: value },
    })
      .then((doc) => {
        let data = doc ? doc : null;
        resolve(data);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });
