import { configure, defineRule } from 'vee-validate'
import { numeric, regex, digits } from '@vee-validate/rules'

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true
})

const ETHEREUM_ADDRESS_REGEX = /^(0x)?[0-9a-fA-F]{40}$/


defineRule('addreess', value =>
ETHEREUM_ADDRESS_REGEX.test(value) ? true : `Enter the correct address`
)

defineRule('required', value =>
  ['', null, undefined].indexOf(value) === -1
    ? true
    : 'This field cannot be empty'
)

defineRule('numeric', () => ({
  ...numeric,
  message: 'Can only hold numbers'
}))

