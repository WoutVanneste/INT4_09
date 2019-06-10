class Api {
  constructor(entity) {
    this.entity = entity;
  }

  getAll = async () => {
    const r = await fetch(`/api/${this.entity}`);
    return await r.json();
  };

  create = async entity => {
    console.log(`entity loggen`, entity.values);
    const r = await fetch(
      `/api/${this.entity}`,
      this.getOptions(`post`, entity.values)
    );
    return await r.json();
  };

  update = async entity => {
    const r = await fetch(
      `/api/${this.entity}/${entity.id}`,
      this.getOptions(`put`, entity.values)
    );
    return await r.json();
  };

  delete = async entity => {
    const r = await fetch(
      `/api/${this.entity}/${entity.id}`,
      this.getOptions(`delete`)
    );
    return r.json();
  };

  getOptions = (method, body = null) => {
    console.log(`body`, body);
    const options = {
      method: method.toUpperCase(),
      headers: {
        "content-type": `application/json`
      }
    };
    if (body) {
      options.body = JSON.stringify(body);
      console.log(`er is een body mann`);
    }
    return options;
  };
}

export default Api;
