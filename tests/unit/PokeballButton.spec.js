import { mount } from '@vue/test-utils';
import PokeballButton from '@/components/PokeballButton.vue';

describe('PokeballButton', () => {
    it('renders the Pokeball button', () => {
      const wrapper = mount(PokeballButton);
      expect(wrapper.exists()).toBe(true);
    });
  
    it('triggers the click event', async () => {
      const wrapper = mount(PokeballButton);
      await wrapper.trigger('click');
      expect(wrapper.emitted('handle-click')).toBeTruthy();
    });
  });

  