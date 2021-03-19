import { shallowMount } from '@vue/test-utils';
import IngrediantsForm from '@/views/Recipe/IngrediantsForm.vue';

describe('IngrediantsForm component tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(IngrediantsForm, {
      props: {
        ingrediants: [{ quantity: 1, productName: 'test', unit: 'kg' }],
      },
    });
  });
  describe('Testing component props', () => {
    it('Should accept/use passed props', () => {
      expect(wrapper.vm.ingrediants).toEqual([
        { quantity: 1, productName: 'test', unit: 'kg' },
      ]);
    });
    it('Should bind input to the props', async () => {
      await wrapper.find('input[type=number]').setValue(1);
      await wrapper.find('input[type=text]').setValue('test');
      expect(wrapper.vm.form.quantity).toBe('1');
      expect(wrapper.vm.form.productName).toBe('test');
    });
  });
  describe('Testing component methods', () => {
    /* because of the validations, comment "if statement" to pass the test */
    it('Should emit addIngrediant event if method is called', async () => {
      await wrapper.find('input[type=number]').setValue(1);
      await wrapper.find('input[type=radio][value=kg]').setValue();
      await wrapper.find('input[type=text]').setValue('test');
      wrapper.vm.addIngrediant();
      expect(wrapper.emitted()).toHaveProperty('addIngrediant');
    });
  });
});
