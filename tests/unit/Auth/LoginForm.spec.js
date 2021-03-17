import { shallowMount } from '@vue/test-utils';
import LoginForm from '@/views/Auth/LoginForm.vue';
import { createStore } from 'vuex';

describe('E2E testing', () => {
  let wrapper, store, authState;
  beforeEach(() => {
    authState = {
      namespaced: true,
      actions: {
        login: jest.fn(),
      },
    };
    store = createStore({
      modules: { auth: authState },
    });
    wrapper = shallowMount(LoginForm, { global: { plugins: [store] } });
  });
  describe('Testing component props', () => {
    it('Should bind input to the props', async () => {
      const [emailInput, passInput] = wrapper.findAll('input');
      await emailInput.setValue('test@test.test');
      expect(emailInput.element.value).toBe('test@test.test');
      expect(wrapper.vm.form.email).toBe('test@test.test');
      await passInput.setValue('test');
      expect(passInput.element.value).toBe('test');
      expect(wrapper.vm.form.password).toBe('test');
    });
  });
  /* To pass the test, must comment 'if statement' in handleSubmit */
  describe('Testing component methods', () => {
    it('Should call handleSubmit after submiting the form', async () => {
      const [emailInput, passInput] = wrapper.findAll('input');
      await emailInput.setValue('test@test.com');
      await passInput.setValue('test');
      await wrapper.find('form').trigger('submit.prevent');
      expect(authState.actions.login).toHaveBeenCalled();
    });
  });
});
