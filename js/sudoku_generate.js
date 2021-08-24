import {copy2dArray} from "./utils.js";

let sudoku = [];
let filled = 0;
let available = [];
const skipProbability = 55/81;

export function generateSudoku()
{
    for (let i=0; i<9; i++)
    {
        sudoku.push([]);
        available.push([]);
        for (let j=0; j<9; j++)
        {
            sudoku[i].push(0);
            available[i].push([]);
            for (let k=1; k<=9; k++)
                available[i][j].push(k);
        }
    }
    generateSudokuRecursive(0, 0);
    // sudokuSkipped = copy2dArray(sudoku);
    skipNumbers();
    // sudokuRefilled = copy2dArray(sudokuSkipped);
    // sudoku = sudokuSkipped
    // if (!good)
    //     sudoku = sudokuRefilled;
    return sudoku;
}

function skipNumbers ()
{
    let tempS = ""
    for (let k=0; k<250; k++)
    {
        let i = Math.floor(Math.random()*9);
        let j = Math.floor(Math.random()*9);
        let originalValue = sudoku[i][j];
        sudoku[i][j] = 0;
        if (numberOfSolutions(0, 0) > 1)
            sudoku[i][j] = originalValue;
    }
    for (let i=0; i<9; i++)
    {
        for (let j=0; j<9; j++)
        {
            if (sudoku[i][j] == 0)
                tempS += " ";
            else
                tempS += sudoku[i][j];
        }
    }
    console.log(tempS);
}

function numberOfSolutions(x, y)
{
    let newX = x, newY = y;
    if (x == 8 && y == 8)
    {
        // console.log(sudokuRefilled[x][y]);
        if (sudoku[x][y] != 0)
            return 1;
    }
    else if (y == 8)
    {
        newX += 1;
        newY = 0;
    }
    else
        newY += 1;
    if (sudoku[x][y] != 0)
        return numberOfSolutions(newX, newY);
    let n = 0;
    for (let i=1; i<=9; i++)
    {
        if (isValid(i, x, y, sudoku))
        {
            sudoku[x][y] = i;
            n+=numberOfSolutions(newX, newY);
            if (n > 1)
            {
                sudoku[x][y] = 0;
                return n;
            }
        }
    }
    sudoku[x][y] = 0;
    return n;
}

//Warning: x and y should not be modified inside the function
function generateSudokuRecursive (x, y)
{
    while (available[x][y].length > 0)
    {        
        // const index = 0;
        const index = Math.floor(Math.random()*available[x][y].length);
        let i = available[x][y][index];
        if (isValid(i, x, y, sudoku))
        {
            sudoku[x][y] = i;
            available[x][y].splice(index, 1);
            let newX = x, newY = y;
            if (x == 8 && y == 8)
            {
                filled = 1;
                return;
            }
            else if (y == 8)
            {
                newX += 1;
                newY = 0;
            }
            else
                newY += 1;
            generateSudokuRecursive(newX, newY);
            if (filled == 1)
                return;
            
        }
        else
            available[x][y].splice(index, 1);
    }
    for (let k=1; k<=9; k++)
        available[x][y].push(k);
    sudoku[x][y] = 0;
}

function isValidRow(n, x, y, sudokuL)
{
    for (let i=0; i<9; i++)
    {
        if (y != i && sudokuL[x][i] == n)
            return false;
    }
    return true;
}

function isValidColumn(n, x, y, sudokuL)
{
    for (let i=0; i<9; i++)
    {
        if (x != i && sudokuL[i][y] == n)
            return false;
    }
    return true;
}

function isValidBox(n, x, y, sudokuL)
{
    let box = getBlockFromPos(x, y);
    for (let i=box[0]; i<box[0]+3; i++)
    {
        for (let j=box[1]; j<box[1]+3; j++)
        {
            if (x != i && y != j && sudokuL[i][j] == n)
                return false;
        }
    }
    return true;
}

function isValid (n, x, y, sudokuL)
{
    if (isValidBox(n, x, y, sudokuL) && isValidRow(n, x, y, sudokuL) && isValidColumn(n, x, y, sudokuL))
        return true;
    return false;
}

function getBlockFromPos(x, y)
{
    return [Math.floor(x/3) * 3, Math.floor(y/3) * 3];
}