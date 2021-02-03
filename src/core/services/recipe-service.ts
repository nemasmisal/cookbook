import BaseFetch from './baseFetch';
class RecipeService {
  private RECIPE_URL = 'recipe/';
  getAllRecipes() {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'allRecipes', 'get', null);
  }
  create(body: any) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'create', 'post', body);
  }
  update(body: any) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'update', 'put', body);
  }
  remove(body: any) {
    return BaseFetch.baseHttp(this.RECIPE_URL + 'remove', 'delete', body);
  }
}
export default new RecipeService();