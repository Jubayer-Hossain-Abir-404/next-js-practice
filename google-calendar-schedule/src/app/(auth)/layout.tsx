import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = auth();
    if (userId) {
        redirect("/");
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            {children}
        </div>
    );
}