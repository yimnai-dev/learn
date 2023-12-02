import { readFile } from 'node:fs';

readFile('./day_two.txt', (error, data) => {
    if(error) throw new Error(error.message)
    const games = data.toString().split('\n').map(gameData => gameData.split(': ')).map(g => {
        const current: [string, Record<Color, number>, boolean] = [g[0], arrToObj(g[1].split('; ')), isPossible(g[1].split('; '))]
        return current
    })
    const partOneResult = games.filter(game => {
        const [, map, isPossible] = game
        if(isPossible){
            return [game]
        }
    }).map(game => {
        const [name] = game
        const splitName = name.split(' ')
        const id = parseInt(splitName[1])
        return id
    }).reduce((a, b) => a + b)
    console.log('partOneResult: ', partOneResult)

    const partTwoResult = games.map(game => {
        const [, gameObj,] = game
        const tempPower = gameObj.red * gameObj.blue * gameObj.green
        return tempPower
    }).reduce((a, b) => a + b)
    console.log('partTwoResult: ', partTwoResult)
})

function isPossible(array: string[]){
    let possible = true;
    array.forEach(el => {
        const parts = el.split(', ')
        parts.forEach(part => {
            const [countA, colorA] = part.split(' ')
            if((colorA === 'green' && +countA > 13) || (colorA === 'blue' && +countA > 14) || (colorA === 'red' && +countA > 12)){
                possible = false
                return;
            }
        })
    })
    return possible
}

function arrToObj(array: string[]){
    let colorMap: Record<Color, number> = {
        red: 0,
        green: 0, 
        blue: 0
    };
    array.forEach(el => {
        const parts = el.split(', ')
        parts.forEach(part => {
            const [countA, colorA] = part.split(' ')
            const tempMapItem = colorMap[(colorA as Color)]
            colorMap = {
                ...colorMap,
                [(colorA as Color)]: parseInt(countA) > tempMapItem ? parseInt(countA) : tempMapItem
            }
        })
        
    })
    return colorMap
}
type Color = 'red' | 'green' | 'blue'