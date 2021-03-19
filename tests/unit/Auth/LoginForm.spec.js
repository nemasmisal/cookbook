import { shallowMount } from '@vue/test-utils';
import LoginForm from '@/views/Auth/LoginForm.vue';
import { createStore } from 'vuex';

describe('LoginForm component tests', () => {
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
  describe('Testing component methods', () => {
    it('Should call handleSubmit after submiting the form', async () => {
      wrapper.vm.v$.$invalid = false;
      wrapper.vm.handleSubmit();
      expect(authState.actions.login).toHaveBeenCalled();
    });
  });
});
