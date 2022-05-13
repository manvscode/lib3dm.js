const fs = require('fs')

const outFiles = [
    'out/m3d.js',
    'out/m3d.min.js'
]

function clean() {
    outFiles.forEach((f) => {
        if (fs.existsSync(f)) {
            console.log(`Removing ${f}`)
            fs.rmSync(f)
        }
    })
}

clean()
