import { UserButton } from "@clerk/nextjs";


export default function EventsPage() {
    return (
        <div className="text-center container my-4 mx-auto">
            <h1 className="text-3xl mb-4">Events</h1>
            <UserButton />
        </div>
    );
}