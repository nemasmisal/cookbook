import BaseFetch from './base-fetch';
class RecipeService {
  RECIPE_URL = 'recipe/';
  getAllRecipes(query) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'allRecipes', 'get', null, query);
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
  recipesByAuthor(query) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'recipesByAuthor', 'get', null, query)
  }
}
export default new RecipeService();
