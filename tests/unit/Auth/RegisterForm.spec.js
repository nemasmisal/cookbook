import { shallowMount } from '@vue/test-utils';
import RegisterForm from '@/views/Auth/RegisterForm.vue';
import { createStore } from 'vuex';

describe('Register form component tests', () => {
  let wrapper, store, authState;
  beforeEach(() => {
    authState = {
      namespaced: true,
      actions: {
        register: jest.fn(),
      },
    };
    store = createStore({
      modules: { auth: authState },
    });
    wrapper = shallowMount(RegisterForm, { global: { plugins: [store] } });
  });

  describe('Testing component props', () => {
    it('Should bind inputs to the props', async () => {
      const [name, email, password, repeatPassword] = wrapper.findAll('input');
      await name.setValue('username');
      await email.setValue('test@test.com');
      await password.setValue('testPass');
      await repeatPassword.setValue('testPass');
      expect(wrapper.vm.form.name).toBe('username');
      expect(wrapper.vm.form.email).toBe('test@test.com');
      expect(wrapper.vm.form.password).toBe('testPass');
      expect(wrapper.vm.form.repeatPassword).toBe('testPass');
    });
  });
  describe('Testing component methods', () => {
    it('Should call handleSubmit after submiting the form', async () => {
      wrapper.vm.v$.$invalid = false;
      wrapper.vm.handleSubmit();
      expect(authState.actions.register).toHaveBeenCalled();
    });
  });
});
