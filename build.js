const fs = require('fs')
const jsmin = require('jsmin').jsmin

const sourceFiles = [
    'mathematics.js',
    'vec2.js',
    'vec3.js',
    'vec4.js',
    'mat2.js',
    'mat3.js',
    'mat4.js',
    'quat.js',
    'transforms.js',
    'geometric-tools.js',
    'module-export.js'
]

const outFile = 'out/m3d.js'

function slurp(filename) {
    const content = fs.readFileSync(filename)
    return content.toString('utf8')
}

async function build(source, output) {
    await source.forEach(async (filename, index) => {
        const f = `src/${filename}`
        const content = await slurp(f)

        await console.log(`Packing "${f}"`)
        fs.writeFileSync(output, content, { flag: index == 0 ? 'w+' : 'a+' })
    })
}

async function minify(input, output) {
    const out = await jsmin(slurp(input))
    fs.writeFileSync(output, out, { flag: 'w+' })
}

async function start() {
    await build(sourceFiles, outFile)
    console.log(`Created ${outFile}`)
    const miniFile = outFile.replace('.js', '.min.js')
    await minify(outFile, miniFile)
    await console.log(`Minifying ${outFile}`)
    console.log(`Created ${miniFile}`)
}


try {
    start()
} catch (err) {
    console.error(err)
}
