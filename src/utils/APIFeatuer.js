export default class ApiFeatures {
  constructor(moongoseQuery, queryString) {
    this.moongoseQuery = moongoseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) {
      page = 1;
    }
      let skip = (page - 1) * 4;
      this.page=page
    this.moongoseQuery.skip(skip).limit(4);
    return this;
  }

  filter() {
    let filterObj = { ...this.queryString };
    let excludedQuery = ["page", "keyword", "failds", "sort"];
    excludedQuery.forEach((e) => {
      delete filterObj[e];
    });

    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/gt|gte|lt|lte/g, (match) => `$${match}`);
    filterObj = JSON.parse(filterObj);

    this.moongoseQuery.find(filterObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");
      this.moongoseQuery.sort(sortBy);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.moongoseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.moongoseQuery.select(fields);
    }
    return this;
  }
}
