import {generateSudoku} from './sudoku_generate.js';

let sudoku = []
export let cells = {};
export let selectedCell = 0;

export function getSudoku()
{
    if (sudoku.length == 0)
        sudoku = generateSudoku();
    return sudoku;
}

export function setSelectedCell(sc)
{
    selectedCell = sc;
}

export function setCell (cell, number)
{
    cells[number] = cell;
}