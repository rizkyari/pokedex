import { mount } from '@vue/test-utils';
import PokemonBadge from '@/components/PokemonBadge.vue';

function rgbToHex(rgb) {
    const hex = rgb
      .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      .slice(1, 4)
      .map((value) => parseInt(value, 10))
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');
    return `#${hex.toUpperCase()}`;
  }

describe('PokemonBadge', () => {
  it('renders each type button correctly', () => {
    const pokeTypes = [
        { type: 'normal', hex : '#D9D9D9', value: 1 },
        { type: 'fighting', hex : '#D56723', value: 2 },
        { type: 'flying', hex : '#A98FF3', value: 3 },
        { type: 'poison', hex : '#B97FC9', value: 4 },
        { type: 'ground', hex : '#AB9842', value: 5 },
        { type: 'rock', hex : '#A38C21', value: 6 },
    ];

    const wrapper = mount(PokemonBadge, {
      props: {
        pokeTypes,
      },
    });

    const buttons = wrapper.findAll('.btn-type');

    expect(buttons).toHaveLength(pokeTypes.length);

    buttons.forEach((button, index) => {
      const type = pokeTypes[index];
      expect(button.text()).toBe(type.type);
      const backgroundColorHex = rgbToHex(button.element.style.backgroundColor);
      expect(backgroundColorHex).toBe(type.hex);
    });
  });
});
