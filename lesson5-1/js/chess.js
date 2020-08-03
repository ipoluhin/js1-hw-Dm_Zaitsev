'use strict';


const arrLiter = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const arrNumber = ['', '1', '2', '3', '4', '5', '6', '7', '8'];

const chessBoard = {
    rows: 9,
    cols: 9,

    chess() {

        let chessTable = document.querySelector('#table');
        for (let i = 0; i < this.rows; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < this.cols; j++) {
                let td = document.createElement('td');
                this.renderColumns(i, j, tr, td);
                this.renderMarkers(i, j, tr, td);
                chessTable.appendChild(tr);
            }
        }
    },
    renderColumns(i, j, tr, td) {
        if (i % 2 === 0 && j % 2 !== 0 || i % 2 !== 0 && j % 2 === 0) {
            td.classList.add('col_black');
            tr.appendChild(td);
        } else {
            td.classList.add('col_white');
            tr.appendChild(td);
        }
    },
    renderMarkers(i, j, tr, td) {
        if (j === 0) {
            td.innerHTML = arrNumber[i];
            td.classList.add('col_grey');
        }
        if (i === 0) {
            td.innerHTML = arrLiter[j];
            td.classList.add('col_grey');
        }
    }
};

chessBoard.chess();


