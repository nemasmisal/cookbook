import { shallowMount } from '@vue/test-utils';
import ValidationInfo from '@/components/Validation-info.vue';

describe('Testing component method toggleReveal', () => {
  it('renders props.msg when passed', () => {
    const fields = { name: 'test name', req: ['1', 2] };
    const wrapper = shallowMount(ValidationInfo, {
      props: { fields },
    });
    wrapper.vm.togglereveal();
    expect(wrapper.text()).toMatch(fields);
  });
});
