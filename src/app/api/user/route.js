import prisma from "@/app/libs/prismadb";
import Prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const bodydata = await req.json();
        const { name, email, password, posts } = bodydata;
        const { title, body, slug } = posts;

        const usersdata = await Prisma.user.create({
            data: {
                name,
                email,
                password,
                posts: {
                    create: { title, body, slug }
                }
            }
        })

        return NextResponse.json(usersdata, { status: 200 })
    } catch (error) {
        NextResponse.json({ message: "create error .. ", error }, { status: 500 })
    }

}


export const GET = async () => {

    const allUserData = await prisma.user.findMany({
        include: {
            posts: true,
        },
    })

    return NextResponse.json({ data: allUserData }, { status: 200 })
}
