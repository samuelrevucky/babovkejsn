import Register from "./register"

export default function Page() {
    return (
        <Register server={process.env.SERVER as string}/>
    );
}