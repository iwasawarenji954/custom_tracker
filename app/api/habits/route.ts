import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

//new はクラスからインスタンスを作成するために必要
const prisma = new PrismaClient();

// テーブル内のすべてのhabitを取得
export async function GET() {
    const habits = await prisma.habit.findMany();
    return NextResponse.json(habits);
}

// habitの追加
export async function POST(req: Request) {
    //リクエストのjsonデータを取得
    //reqにはクライアントが送ってきたデータが含まれている
    const {name, score} = await req.json();
    if (!name || typeof score !== 'number') {
        return NextResponse.json({ error: 'Invalid input' }, {status: 400});
    }

    //DBに保存
    const newHabit = await prisma.habit.create({
        data: { name, score },
    });
    //追加したデータをレスポンスとして返すres
    return NextResponse.json(newHabit, { status: 201});
}