interface Ingrediant {
  id: number;
  quantity: string;
  productName: string;
}

export interface Recipe {
  name: string;
  description: string;
  author: string;
  type: string;
  ingrediants: Ingrediant[];
  imgUrl: string;
  _id: string;
}
