'use strict';


const arrLiter = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const arrNumber = ['', '1', '2', '3', '4', '5', '6', '7', '8'];

const chessBoard = {
    rows: 9,
    cols: 9,

    chess() {

        let chessTable = document.querySelector('#table');                      //Получаем элемент с id
        for (let i = 0; i < this.rows; i++) {
            let tr = document.createElement('tr');                              //Создание строки
            for (let j = 0; j < this.cols; j++) {
                let td = document.createElement('td');                          //Создание ячейки
                if (i % 2 === 0 && j % 2 !== 0 || i % 2 !== 0 && j % 2 === 0) { // i - номер строчки, j -номер столбца
                    td.classList.add('col_black');                             //Присваиваем класс .col__black ячейке
                    tr.appendChild(td);                                         //Добавляем ячейку в строку
                } else {
                    td.classList.add('col_white');                             //Присваиваем класс .col__white ячейке
                    tr.appendChild(td);
                }
                if (j === 0) {                                                  //Отрисовка Циферок
                    td.innerHTML = arrNumber[i];
                    td.classList.add('col_grey');
                }
                if (i === 0) {                                                  //Отрисовка Букв
                    td.innerHTML = arrLiter[j];
                    td.classList.add('col_grey');
                }
                chessTable.appendChild(tr);                                     //Добавляем строки в элементс id
            }
        }
    },
};

chessBoard.chess();                                                             //запускаем отрисовку доски


