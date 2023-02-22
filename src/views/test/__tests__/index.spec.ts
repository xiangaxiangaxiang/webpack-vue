import { mount } from '@vue/test-utils'
import TestComponent from '../index.vue'

test('displays message', () => {
    const wrapper = mount(TestComponent, {
        props: {
            msg: 'Hello world'
        }
    })
  
    // Assert the rendered text of the component
    expect(wrapper.text()).toContain('Hello world')
})