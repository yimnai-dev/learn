import { readFile } from 'node:fs';

// Part 1 Start

readFile('./part_one.txt', (err, data) => {
    if(err)throw Error(err.message)
    const splitFile = data.toString().split('\n')
    const result = splitFile.map(item => item.split('').filter(i => !isNaN(parseInt(i)))).map(item => {
        if(item.length > 1){
            return Number(item[0] + item[item.length - 1])
        }
        return Number(item[0] + item[0])
    }).reduce((a, b) => a + b);
    console.log(result)
})

// Part 1 End

//part 2 Start

readFile('./part_two.txt', (err, data) => {
    if(err)throw new Error(err.message)
    const equiv = ['one-1', 'two-2', 'three-3', 'four-4', 'five-5', 'six-6', 'seven-7', 'eight-8', 'nine-9']
    const splitFile = data.toString().split('\n')
    const result = splitFile.map((split) => {
        let temp = ''
        for(let i=0; i<split.length; i++){
            if(!isNaN(Number(split[i]))){
                temp += split[i]
            }
            equiv.forEach(eq => {
                const [word, digit] = eq.split('-')
                const currentSlice = split.slice(i, i+word.length)
                if(word && currentSlice === word){
                    temp += digit
                }
            })
        }
        return temp
    }).map(item => item.split('')).map(item => {
        if(item.length > 1){
            return Number(item[0] + item[item.length - 1])
        }
        return Number(item[0] + item[0])
    }).reduce((a, b) => a + b)

    console.log('res: ', result)
})


// part 2 end