import { mount } from '@vue/test-utils';
import PokeballSpinner from '@/components/PokeballSpinner.vue';

describe('PokeballSpinner', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(PokeballSpinner);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.pokemon').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Please Wait...'); 
  });

  it('matches snapshot', () => {
    const wrapper = mount(PokeballSpinner);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
