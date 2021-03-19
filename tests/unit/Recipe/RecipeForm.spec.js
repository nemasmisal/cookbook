import { shallowMount } from '@vue/test-utils';
import RecipeForm from '@/views/Recipe/RecipeForm.vue';
import { createStore } from 'vuex';

describe('RecipeForm component tests', () => {
  let wrapper, store, authState;
  const recipe = {
    name: 'testName',
    description: 'test description',
    type: 'private',
    imgUrl: 'http://test',
    ingrediants: [{ id: 1, id: 2, id: 3 }],
    _id: 'testId',
  };
  beforeEach(() => {
    authState = {
      namespaced: true,
      getters: {
        id: () => 'testId',
      },
    };
    store = createStore({
      modules: { auth: authState },
    });
    wrapper = shallowMount(RecipeForm, {
      props: { existingRecipe: recipe },
      global: { plugins: [store] },
    });
  });
  describe('Testing component props', () => {
    it('Should accept/use passed props', () => {
      expect(wrapper.vm.recipe.name).toBe('testName');
      expect(wrapper.vm.recipe.description).toBe('test description');
      expect(wrapper.vm.recipe.type).toBe('private');
      expect(wrapper.vm.recipe.imgUrl).toBe('http://test');
      expect(wrapper.vm.recipe.ingrediants).toEqual([{ id: 1, id: 2, id: 3 }]);
      expect(wrapper.vm.recipe._id).toBe('testId');
    });
    it('Should bind input to the props', async () => {
      const [name, imgUrl] = wrapper.findAll('input');
      await name.setValue('anotherTest');
      await imgUrl.setValue('http://another-test');
      await wrapper.find('textarea').setValue('another test description');
      await wrapper.find('select').setValue('public');
      expect(wrapper.vm.recipe.name).toBe('anotherTest');
      expect(wrapper.vm.recipe.imgUrl).toBe('http://another-test');
      expect(wrapper.vm.recipe.description).toBe('another test description');
      expect(wrapper.vm.recipe.type).toBe('public');
    });
  });
  describe('Testing component methods', () => {
    it('Should add new ingrediant to ingrediants array', () => {
      wrapper.vm.addIngrediant('test ingrediant');
      expect(wrapper.vm.recipe.ingrediants).toContain('test ingrediant');
    });
    it('Should remove ingrediant from ingrediants array', () => {
      wrapper.vm.addIngrediant({ id: 1 });
      wrapper.vm.addIngrediant({ id: 2 });
      wrapper.vm.addIngrediant({ id: 3 });
      wrapper.vm.removeIngr(2);
      expect(wrapper.vm.recipe.ingrediants).not.toContainEqual({ id: 2 });
    });
    /* because of the validations, comment "if statement" to pass the test */
    it('Should emit event after handleSubmit have been called', () => {
      wrapper.vm.handleSubmit();
      expect(wrapper.emitted()).toHaveProperty('handleSubmit');
    });
  });
});
