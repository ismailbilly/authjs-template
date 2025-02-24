import { signIn } from "@/auth";
import { IoLogoGoogle } from "react-icons/io5";

export const GoogleButton = () => {
    return(
        <form action={async ()=>{
            "use server"
            await signIn("google")
        }} className="w-full">

            <button type="submit" className="flex items-center justify-center gap-2 py-2.5 rounde-lg uppercase font-medium text-sm bg-blue-500 w-full text-white">
                <IoLogoGoogle />
                Sign in with Google
            </button>
        </form>
    )
}