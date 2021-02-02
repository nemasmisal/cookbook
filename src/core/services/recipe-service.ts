class RecipeService {
  async getAllRecipes() {
    try {
      const _res = await fetch('http://localhost:8081/api/recipe/allRecipes');
      const res = await _res.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RecipeService();