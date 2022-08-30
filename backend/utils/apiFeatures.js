class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const title = this.queryStr.title
      ? {
          title: {
            $regex: this.queryStr.title,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...title });
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
