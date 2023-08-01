declare global {
  interface Document {
    startViewTransition: (callback: () => void) => void
  }
}

export default Document
