import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}
export default AppProvider