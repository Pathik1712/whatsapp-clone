import { useEffect } from "react"

export const useChange = () => {
  useEffect(() => {
    const func = () => {
      const height = window.innerHeight
      document.getElementsByClassName("home")[0].style.height = `${height}px`
      console.log(height)
    }
    func()
    window.addEventListener("resize", func)
    return window.removeEventListener("resize", func)
  }, [])
}
