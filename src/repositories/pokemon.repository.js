import axios from "axios";

const URL_API = 'https://pokeapi.co/api/v2'

export default class PokemonRepository {
  // Definir el cliente Axios para consumir el servicio
  get ws() {
    const _ws = axios.create({
      baseURL: URL_API,
    });
    return _ws;
  }

  async getAll() {
    const endpoint = `/pokemon?limit=100000&offset=0`;
    let res = await this.ws.get(endpoint);
    return res.data.results;
  }

  async getPokemon(url) {
    let res = await axios.get(url);
    return res.data;
  }

  async getTypes() {
    const endpoint = `/type`;
    let res = await this.ws.get(endpoint);
    return res.data.results;
  }

  async update(id, body) {
    const endpoint = `/pokemon/${id}`;

    let res = await this.ws.put(endpoint, body);
    return res;
  }

  async create(body) {
    const endpoint = `/pokemon`;

    let res = await this.ws.post(endpoint, body);
    return res;
  }

  async remove(id) {
    const endpoint = `/pokemon/${id}`;

    let res = await this.ws.delete(endpoint);
    return res;
  }
}