import { shallowMount } from '@vue/test-utils';
import InputReqs from '@/components/InputReqs.vue';

describe('InputReqs component tests', () => {
  let fields;
  let wrapper;
  beforeEach(() => {
    fields = [{ name: 'test name', reqs: ['first req', 'second req'] }];
    wrapper = shallowMount(InputReqs, {
      props: { fields },
    });
  });
  describe('Testing component props', () => {
    it('Should accept/use passed props', () => {
      expect(wrapper.vm.fields).toMatchObject(fields);
    });
    it('Should have inital reveal value to false', () => {
      expect(wrapper.vm.reveal).toBeFalsy();
    });
  });
  describe('Testing component methods', () => {
    it('Should set reveal value to its oposite', async () => {
      expect(wrapper.vm.reveal).toBeFalsy();
      await wrapper.vm.toggleReveal();
      expect(wrapper.vm.reveal).toBeTruthy();
      await wrapper.vm.toggleReveal();
      expect(wrapper.vm.reveal).toBeFalsy();
    });
  });
});
