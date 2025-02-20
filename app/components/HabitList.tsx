'use client';

import { useState } from "react";

const initialHabits = [
    {id: 1, name: '運動する', isCompleted: false},
    {id: 2, name: '歯磨く', isCompleted: false},
    {id: 3, name: '朝起きる', isCompleted: false},
    {id: 4, name: '水飲む', isCompleted: false},
    {id: 5, name: '瞑想する', isCompleted: false},
];

export default function HabitList() {
    //初期値としてinitialhabitsをセットする
    const [habits, sethabits] = useState(initialHabits);

    //チェックボックスをクリックされたら呼ばれる
    //引数は押された習慣のid
    const toggleHabit = (id: number) => {
        //map(for)で回す
        const updateHabits = habits.map((habit) =>
            //三項演算子
            //条件 ? trueの時の処理 : falseの時の処理 
            habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
        );
        sethabits(updateHabits);
    };

//filter((要素) => 条件(true)) で配列を新規作成
const completedCount = habits.filter((habit) => habit.isCompleted).length;

return (
    <div>
        <h2>今日の習慣</h2>
        <ul>
            {habits.map((habit) => (
                <li key={habit.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={habit.isCompleted}
                            //クッリクしたらtogglehabitを呼ぶ
                            onChange={() => toggleHabit(habit.id)}
                        />
                        {habit.name}
                    </label>
                </li>
            ))}
        </ul>
        <h3> {completedCount}/{habits.length} クリア！</h3>
    </div>
)

};