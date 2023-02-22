import {render} from '@testing-library/vue'
import Cxk from '../cxk'

test('increments value on click', async () => {
    const {getByText} = render(Cxk)

    getByText('i like singing,dancing,rap,basketball')
})