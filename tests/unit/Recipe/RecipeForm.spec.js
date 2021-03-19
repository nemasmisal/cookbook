import { shallowMount } from '@vue/test-utils';
import RecipeForm from '@/views/Recipe/RecipeForm.vue';
import { createStore } from 'vuex';

describe('LoginForm component tests', () => {
  let wrapper, store, authState;
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
    wrapper = shallowMount(RecipeForm, { global: { plugins: [store] } });
  });
  describe('Testing component props', () => {
    it('Should bind input to the props', async () => {
      const [name, imgUrl] = wrapper.findAll('input');
      await name.setValue('testName');
      await imgUrl.setValue('http://test');
      await wrapper.find('textarea').setValue('test description');
      await wrapper.find('select').setValue('private');
      expect(wrapper.vm.recipe.name).toBe('testName');
      expect(wrapper.vm.recipe.imgUrl).toBe('http://test');
      expect(wrapper.vm.recipe.description).toBe('test description');
      expect(wrapper.vm.recipe.type).toBe('private');
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
