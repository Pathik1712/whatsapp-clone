import { useEffect } from "react"

export const useChange = (name) => {
  useEffect(() => {
    const func = () => {
      const height = window.innerHeight
      document.getElementsByClassName(name)[0].style.height = `${height}px`
    }
    func()
    window.addEventListener("resize", func)
    return window.removeEventListener("resize", func)
  }, [])
}
