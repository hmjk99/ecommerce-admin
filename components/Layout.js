import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"

export default function Layout({ children }) {
  const { data: session } = useSession()
  if (!session){
    return(
      <div className="bg-purple-100 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <h1 className="mb-5">Welcome to the Admin Panel!</h1>
          <button onClick={() => signIn('google')} className="bg-purple-400 text-white p-4 rounded-lg">Login with Google</button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-purple-200 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">{children}</div>
    </div>
    
  )
}
