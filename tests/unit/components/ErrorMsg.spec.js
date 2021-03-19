import { shallowMount } from '@vue/test-utils';
import ErrorMsg from '@/components/ErrorMsg.vue';

describe('ErrorMsg component tests', () => {
  let errorsObj = [];
  let wrapper;
  beforeEach(() => {
    errorsObj = [
      { $message: 'first error msg' },
      { $message: 'second error msg' },
    ];
    wrapper = shallowMount(ErrorMsg, {
      props: { errorsObj },
    });
  });
  describe('Testing component props', () => {
    it('Should accept/use passed props', () => {
      expect(wrapper.vm.errorsObj).toMatchObject(errorsObj);
    });
  });
  describe('Testing component rendering', () => {
    it('Should have expected HTML structure', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
