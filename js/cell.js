import { cells, selectedCell, setSelectedCell } from "./sudoku_main.js";

export class Cell
{
    constructor (cellButton, number)
    {
        cellButton.onmouseover = () => this.onCellMouseEnter();
        cellButton.onmouseout = () => this.onCellMouseExit();
        cellButton.onmousedown = () => this.onCellSelect();
        this.cellButton = cellButton;
        this.number = number;
    }

    onCellSelect ()
    {
        if (this.cellButton.className == "hover")
        {
            if (selectedCell != 0)
            {
                let prevCell = cells[selectedCell];
                setSelectedCell(this.number);
                prevCell.onCellSelect();
            }
            else
                setSelectedCell(this.number);
            this.cellButton.className = "select";
        }
        else if (this.cellButton.className == "select")
        {
            if (selectedCell == this.number)
            {
                this.cellButton.className = "hover";
                setSelectedCell(0);
            }
            else
                this.cellButton.className = "";
        }
    }

    onCellMouseEnter ()
    {
        if (this.cellButton.className == "")
            this.cellButton.className = "hover";
    }

    onCellMouseExit ()
    {
        if (this.cellButton.className == "hover")
            this.cellButton.className = "";
    }
}