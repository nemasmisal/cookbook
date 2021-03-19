import { shallowMount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import { createStore } from 'vuex';
describe('Navbar component tests', () => {
  let wrapper, store, authState;
  beforeEach(() => {
    authState = {
      namespaced: true,
      getters: {
        id: () => 'testId',
      },
      actions: {
        logout: jest.fn(),
      },
    };
    store = createStore({
      modules: {
        auth: authState,
      },
    });
    wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });
  });
  describe('Testing component props', () => {
    it('Should get value from store/vuex', () => {
      expect(wrapper.vm.id).toBe('testId');
    });
  });
  describe('Testing component methods', () => {
    it('Should dispatch action if handleLogout method is called', () => {
      wrapper.vm.handleLogout();
      expect(authState.actions.logout).toHaveBeenCalled();
    });
  });
});
