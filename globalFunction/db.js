const {readFile, writeFile} = require('fs/promises')

async function readFileG(path) {
    try {
        const file = await readFile(path, 'utf8')
        if (file)
            return file
    }catch (e) {
        return  []
    }
}

async function writeItemOnFile(path, item) {
    try {
        const file = await readFile(path, 'utf8')

        if (file){
            const array = [...JSON.parse( file)]
            array.push(item)
             await  writeFile(path,JSON.stringify(array))
        }
    }catch (e) {
        throw(e)
    }
}
async function updateFile(path, data) {
    try {
        const file = await readFile(path, 'utf8')

        if (file){
            await  writeFile(path,JSON.stringify(data))
        }
    }catch (e) {
        throw(e)
    }
}

module.exports ={readFileG,writeItemOnFile, updateFile }
