const { compile } = require('nexe')

compile({
    input: './index.mjs',
    build: true, //required to use patches
    name: 'textlint',
    resource: ['./node_modules/', './index.mjs']
}).then(() => {
    console.log('success')
})