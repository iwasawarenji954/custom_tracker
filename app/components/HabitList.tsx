'use client';

import { useState, useEffect } from "react";

// const initialHabits = [
//     {id: 1, name: '運動する', isCompleted: false},
//     {id: 2, name: '歯磨く', isCompleted: false},
//     {id: 3, name: '朝起きる', isCompleted: false},
//     {id: 4, name: '水飲む', isCompleted: false},
//     {id: 5, name: '瞑想する', isCompleted: false},
// ];

export default function HabitList() {
    //初期値をセットする
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [score, setScore] = useState(1);
    
    //APIからデータを取得
    //そもそもuseEffectはレンダリング処理以外のことの時に使う
    useEffect(() => {
        //fetchはAPIにリクエストを送る関数今回はGETリクエスト
        fetch('/api/habits')
        //thenは非同期処理の時に使う
        //(最初)を受け取って => 以降を行う
            .then((res) => res.json())
            .then((data) => setHabits(data));
        //[]が空のときは1回だけ実行される(ページリロードされるたび)
        //もしcountとか入ってたらcountが変わるたびに変わる
    }, []);

    //habitの追加
    const addHabit = async () => {
        if (!newHabit.trim()) return;

        const res = await fetch('/api/habits', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name: newHabit, score}),
        });

        //レスポンスにはステータスコードがある
        //200系：成功　400,500系：失敗
        //成功ならres.okはtrue, else false
        if (res.ok) {
            setNewHabit('');
            setScore(1);
            const updateHabits = await fetch('api/habits')
                .then((res) => res.json());
            setHabits(updateHabits);
        }
    };
    //チェックボックスをクリックされたら呼ばれる
    //引数は押された習慣のid
    // const toggleHabit = (id: number) => {
    //     //map(for)で回す
    //     const updateHabits = habits.map((habit) =>
    //         //三項演算子
    //         //条件 ? trueの時の処理 : falseの時の処理 
    //         habit.id === id ? { ...habit, isCompleted: !habit.isCompleted } : habit
    //     );
    //     sethabits(updateHabits);
    // };

//filter((要素) => 条件(true)) で配列を新規作成
// const completedCount = habits.filter((habit) => habit.isCompleted).length;

// return (
//     <div>
//         <h2>今日の習慣</h2>
//         <ul>
//             {habits.map((habit) => (
//                 <li key={habit.id}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={habit.isCompleted}
//                             //クッリクしたらtogglehabitを呼ぶ
//                             onChange={() => toggleHabit(habit.id)}
//                         />
//                         {habit.name}
//                     </label>
//                 </li>
//             ))}
//         </ul>
//         <h3> {completedCount}/{habits.length} クリア！</h3>
//     </div>
// )

    return (
        <div>
            <h2>今日の習慣</h2>
            <input 
                type='text'
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder='新しい習慣を入力'
            />
            <input 
                type='number'
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                min='1'
                max='5'
            />
            <button onClick={addHabit}>
                追加
            </button>

            <ul>
                {habits.map((habit: any) => (
                    <li key={habit.id}>
                        {habit.name} - スコア: {habit.score}    
                    </li>
                ))}
            </ul>
        </div>
    );
}