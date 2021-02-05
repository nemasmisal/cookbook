interface Ingrediant {
  id: number;
  quantity: number;
  productName: string;
}

export interface IRecipe {
  name: string;
  description: string;
  author: string;
  type: string;
  ingrediants: Ingrediant[];
  imgUrl: string;
  _id: string;
}