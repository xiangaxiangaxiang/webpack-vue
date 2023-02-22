import {render, fireEvent} from '@testing-library/vue'
import TestComponent from '../index.vue'

test('increments value on click', async () => {
    const {getByText} = render(TestComponent)

    getByText('Times clicked: 0')

    const button = getByText('increment')

    await fireEvent.click(button)
    await fireEvent.click(button)

    getByText('Times clicked: 2')
})