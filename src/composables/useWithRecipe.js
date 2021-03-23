import { useStore } from 'vuex';

export function useRemoveRecipe() {
  const store = useStore();
  const removeRecipe = (id) => {
    store.dispatch('recipe/remove', { id });
  };

  return {
    removeRecipe,
  };
}
