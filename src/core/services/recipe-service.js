import BaseFetch from './base-fetch';
class RecipeService {
  RECIPE_URL = 'recipe/';
  getAllRecipes() {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'allRecipes', 'get', null);
  }
  create(body) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'create', 'post', body);
  }
  update(body) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'update', 'put', body);
  }
  remove(body) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'remove', 'delete', body);
  }
}
export default new RecipeService();
