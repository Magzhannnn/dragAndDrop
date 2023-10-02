import * as React from "react";
import { useState } from "react";

interface IItem {
  id: number;
  title: string;
}

interface IBoard {
  id: number;
  title: string;
  items: IItem[];
}

const DragAndDrop = () => {
  const [boards, setBoards] = useState<IBoard[]>([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Пойти магазин" },
        { id: 2, title: "Выкинуть мусор" },
      ],
    },
    {
      id: 2,
      title: "Проверить",
      items: [
        { id: 3, title: "Код ревью" },
        { id: 4, title: "Задача на факториал" },
      ],
    },
    {
      id: 3,
      title: "Сделано",
      items: [
        { id: 5, title: "Снять видео" },
        { id: 6, title: "Смонтировать" },
      ],
    },
  ]);

  const [currItem, setCurrItem] = useState<IItem | null>(null);
  const [currBoard, setCurrBoard] = useState<IBoard | null>(null);

  const dargStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IBoard,
    itemBoard: IItem
  ) => {
    setCurrBoard(board);
    setCurrItem(itemBoard);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.target.style.boxShadow = "none";
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.target.style.boxShadow = "none";
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target.className === "item") {
      e.target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IBoard,
    item: IItem
  ) => {
    e.preventDefault();

    const changeBoard = currBoard && {
      ...currBoard,
      items: currBoard?.items.filter((item) => item.id !== currItem?.id),
    };

    currItem && board.items.push(currItem);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === changeBoard?.id) {
          return changeBoard;
        }
        return b;
      })
    );
  };

  const dropBoardHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IBoard
  ) => {
    currItem && board.items.push(currItem);

    const changeBoard = currBoard && {
      ...currBoard,
      items: currBoard?.items.filter((item) => item.id !== currItem?.id),
    };

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === changeBoard?.id) {
          return changeBoard;
        }
        return b;
      })
    );
  };

  return boards.map((board) => (
    <div
      className="board"
      key={board.id}
      draggable={true}
      onDrop={(e) => dropBoardHandler(e, board)}
      onDragOver={dragOverHandler}
    >
      <div className="board__title">{board.title}</div>
      {board.items.map((item) => (
        <div
          onDragStart={(e) => dargStartHandler(e, board, item)}
          onDragLeave={dragLeaveHandler}
          onDragEnd={dragEndHandler}
          onDragOver={dragOverHandler}
          onDrop={(e) => dropHandler(e, board, item)}
          draggable={true}
          className="item"
          key={item.id}
        >
          {item.title}
        </div>
      ))}
    </div>
  ));
};

export default DragAndDrop;
