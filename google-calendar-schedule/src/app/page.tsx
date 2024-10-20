import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="text-center container my-4 mx-auto">
      <h1 className="text-3xl mb-4">Hello, Next.js!</h1>
      <div className="flex justify-center gap-2">
        <Button>Sign In</Button>
        <Button>Sign Out</Button>
      </div>
    </div>
  );
}
