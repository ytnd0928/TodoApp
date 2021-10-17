import { React, useState } from "react";
import "./styles.css";

export const App = () => {
  //入力した値のstate
  const [todoText, setTodoText] = useState([]);
  //未完了のtodoを格納する配列
  const [inCompleteTodos, setInCompleteTodos] = useState([]);
  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };
  //追加ボタンを押したときの挙動
  const onClickAdd = () => {
    //inputの中身がからのときはリストに入らず　、アラートを表示させる処理
    if (todoText === "") return alert("Please enter todo");
    const newTodos = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    //追加時にiputの中を空にする
    setTodoText("");
  };
  //完了済みのtodoを格納する配列
  const [CompleteTodos, setCompleteTodos] = useState([]);

  //未完了Todoを削除する関数
  const onClickDelete = (i) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(i, 1);
    setInCompleteTodos(newTodos);
  };
  //完了済みtodoを削除する関数
  const onClickCompleteDelete = (i) => {
    const newTodos = [...CompleteTodos];
    newTodos.splice(i, 1);
    setCompleteTodos(newTodos);
  };

  //未完了todoから完了todoに移す関数
  //完了ボタンを押したときの挙動
  const onClickComplete = (i) => {
    const newInCompleteTodos = [...inCompleteTodos];
    newInCompleteTodos.splice(i, 1);

    const newCompleteTodos = [...CompleteTodos, inCompleteTodos[i]];
    setInCompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  //完了済みのタスクを未完了タスクに移す関数
  const onClickReturn = (i) => {
    const newCompleteTodos = [...CompleteTodos];
    newCompleteTodos.splice(i, 1);

    const newInCompleteTodos = [...inCompleteTodos, CompleteTodos[i]];
    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newInCompleteTodos);
  };
  return (
    <>
      <h3 className="title">TODO</h3>
      <div className="input-area">
        <input
          placeholder="todo"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>add</button>
      </div>
      <div className="incomplete-area">
        <h4 className="title">未完了のTODO</h4>
        <ul>
          {inCompleteTodos.map((todo, i) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(i)}>完了</button>
                <button onClick={() => onClickDelete(i)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <h4 className="title">完了したTODO</h4>
        <ul>
          {CompleteTodos.map((todo) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={onClickReturn}>戻す</button>
                <button onClick={onClickCompleteDelete}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
