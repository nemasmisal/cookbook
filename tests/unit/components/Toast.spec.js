import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast.vue';
import { createStore } from 'vuex';

describe('E2E testing', () => {
  let wrapper, store, msgState;
  beforeEach(() => {
    msgState = {
      namespaced: true,
      getters: {
        msg: () => 'Test msg',
        err: () => 'Err msg',
      },
    };
    store = createStore({
      modules: {
        msg: msgState,
      },
    });
    wrapper = shallowMount(Toast, {
      global: {
        plugins: [store],
      },
    });
  });
  describe('Testing component props', () => {
    it('Should get value from store/vuex', () => {
      expect(wrapper.vm.message).toBe('Test msg');
      expect(wrapper.vm.err).toBe('Err msg');
    });
  });
  describe('Testing component rendering', () => {
    it('Should render msg/err from store/vuex', () => {
      expect(wrapper.html()).toContain('Test msg');
      expect(wrapper.html()).toContain('Err msg');
    });
  });
});
