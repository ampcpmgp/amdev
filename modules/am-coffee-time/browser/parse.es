import generate from './generate'
import jsyaml from 'js-yaml'

const yaml = document.querySelector('script[for="test-list"]').innerHTML
const data = jsyaml.load(yaml)

generate(data)
