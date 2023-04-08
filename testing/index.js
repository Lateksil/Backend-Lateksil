for (const key of nameFilter) {
    if (filter[key]) {
      if (!where[Op.or]) {
        where[Op.or] = [];
      }
      where[Op.or].push({ [key]: { [Op.iLike]: `%${filter[key]}%` } });
    }
  }