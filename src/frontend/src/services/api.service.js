import JwtService from "@/services/jwt.service";
import axios from "../plugins/axios"; "@/plugins/axios";
import { DoughMap, SauceMap, SizeMap, IngredientMap } from "@/common/const";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query() {
    const { data } = await axios.get(this.#resource);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class BuilderApiService extends BaseApiService {
  _parseDetail(map, item) {
    return {
      ...item,
      value: map[item.name],
      isChecked: item.id === 1,
    };
  }


  _parseSize(item) {
    return {
      ...item,
      value: SizeMap[item.name],
      isChecked: item.multiplier === 1,
    };
  }

  _parseIngredient(item) {
    return {
      ...item,
      englishName: IngredientMap[item.name],
      quantity: 0,
    };
  }

  async fetchDough() {
    const { data } = await axios.get("dough");
    return data.map((item) => this._parseDetail(DoughMap, item));
  }
  async fetchSauces() {
    const { data } = await axios.get("sauces");

    return data.map((item) => this._parseDetail(SauceMap, item));
  }

  async fetchSizes() {
    const { data } = await axios.get("sizes");
    return data
      .map((item) => this._parseSize(item))
      .sort((a, b) => a.multiplier - b.multiplier);
  }

  async fetchIngredients() {
    const { data } = await axios.get("ingredients");

    return data.map((item) => this._parseIngredient(item));
  }
}