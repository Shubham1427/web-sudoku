import { getSudoku, setCell } from "./sudoku_main.js";
import { Cell } from "./cell.js";

window.drawSudoku = function drawSudoku()
{
    var canvas = document.getElementById('sudoku');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (let i=1; i<9; i++)
        {
            drawRowLine(ctx, i);
            drawColumnLine(ctx, i);
        }
        CreateGrid(ctx);
    }
}

function drawRowLine(ctx, i)
{
    ctx.beginPath();
    if (i%3 == 0)
        ctx.lineWidth = 3;
    else
        ctx.lineWidth = 1;
    let startPos = 100*i + i;
    if (i > 2)
        startPos += 1;
    if (i > 3)
        startPos += 1;
    if (i > 5)
        startPos += 1;
    if (i > 6)
        startPos += 1;
    ctx.moveTo(0, startPos);
    ctx.lineTo(912, startPos);
    ctx.stroke();
}

function drawColumnLine(ctx, i)
{
    ctx.beginPath();
    if (i%3 == 0)
        ctx.lineWidth = 3;
    else
        ctx.lineWidth = 1;
    let startPos = 100*i + i;
    if (i > 2)
        startPos += 1;
    if (i > 3)
        startPos += 1;
    if (i > 5)
        startPos += 1;
    if (i > 6)
        startPos += 1;
    ctx.moveTo(startPos, 0);
    ctx.lineTo(startPos, 912);
    ctx.stroke();
}

function CreateGrid(ctx)
{
    const sudoku = getSudoku();
    let lastElement= document.getElementById("sudoku");
    for (let i=0; i<9; i++)
    {
        for (let j=0; j<9; j++)
        {
            let cellButton = createCellButton(i, j, sudoku[i][j]);
            lastElement.parentNode.insertBefore(cellButton, lastElement.nextSibling);
            let cellNumber = (i+1)*10 + j+1;
            setCell(new Cell (cellButton, cellNumber), cellNumber);
        }
    }
}

function createCellButton (i, j, n)
{
    let cellButton = document.createElement('input');
    cellButton.setAttribute('type', 'button');
    cellButton.setAttribute('id', 'cell');
    if (n>0)
        cellButton.setAttribute('value', n);
    let xpos = (100*i + 5 + i);
    if (i > 2)
        xpos += 2;
    if (i > 5)
        xpos += 2;
    let ypos = (100*j + 5 + j);
    if (j > 2)
        ypos += 2;
    if (j > 5)
        ypos += 2;
    if (i==0 || j==0 || i==8 || j==8)
    {
        cellButton.style.width -= 5
        cellButton.style.height -= 5
    }
    cellButton.style.top = xpos.toString()+"px";
    cellButton.style.left = ypos.toString()+"px";
    return cellButton;
}