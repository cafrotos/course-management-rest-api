const queryParser = (query) => {
  if (!query.limit || query.limit < 0) query.limit = 20;
  if (!query.currentPage || query.currentPage < 1) query.currentPage = 1;
  query.offset = (query.currentPage - 1) * query.limit;
  if (query.order) {
    query.order = JSON.parse(query.order);
    query.order = query.order.map(item => [item.field, item.sort])
  } else {
    query.order = [['id', 'DESC']];
  }
  if (query['where']) {
    query['where'] = JSON.parse(query.where)
  }

  if (query['attributes']) {
    query['attributes'] = JSON.parse(query.attributes)
  }

  return query;
}

module.exports = {
  queryParser
}