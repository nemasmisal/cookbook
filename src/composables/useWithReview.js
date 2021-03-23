import { computed } from 'vue';

export function useAddReview(store, review, recipeId, author) {
  const addReview = () => {
    store.dispatch('reviews/addReview', {
      review: review.value,
      recipeId,
      author: author.value,
    });
  };
  return { addReview };
}

export function useCanWriteReview(reviews, userId) {
  const canWriteReview = computed(
    () => !reviews.value.find((r) => r.author._id === userId.value)
  );
  return { canWriteReview };
}

export function useSymbolsLeft(textArea) {
  const symbolsLeft = () => {
    return 60 - textArea.value.length;
  };
  return { symbolsLeft };
}
