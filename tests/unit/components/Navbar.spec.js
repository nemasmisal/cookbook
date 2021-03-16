import { shallowMount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import { createStore } from 'vuex';
describe('E2E testing', () => {
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
    it('Should trigger handleLogout method after DOM click event', () => {
      wrapper.find('a').trigger('click');
      expect(authState.actions.logout).toHaveBeenCalled();
    });
  });
});
