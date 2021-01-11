const _ = require('lodash');

global.getPagination = (page, size) => {
  const limit = size ? +size : 25;
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

global.getPagingData = (items, page, size) => {
  const limit = size ? +size : 25;

  const { count: total, rows: data } = items;
  const current_page = page ? +page : 0;
  const last_page = Math.ceil(total / limit);
  const per_page = limit;
  const from = _.head(data).id;
  const to = _.last(data).id;

  const meta = {};
  meta['meta'] = {
    total,
    last_page,
    current_page,
    per_page,
    from,
    to,
  };
  return { data, ...meta };
};
