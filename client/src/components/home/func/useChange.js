import { useEffect } from "react"

export const useChange = () => {
  useEffect(() => {
    const func = () => {
      let height = window.innerHeight
      document.getElementsByClassName("home")[0].style.height = `${height}px`
      console.log("hi")
    }
    func()
    window.addEventListener("resize", func)
    return () => window.removeEventListener("resize", func)
  }, [])
}
