import { Controller } from "@hotwired/stimulus"
import { Editor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

export default class extends Controller {
  static targets = ["editor", "hidden"]

  connect() {
    const placeholder = this.element.dataset.placeholder || "Start writing your story…"

    this.editor = new Editor({
      element: this.editorTarget,
      extensions: [
        StarterKit.configure({ heading: { levels: [2,3] } }),
        Link.configure({ openOnClick: false }),
        Image,
        Placeholder.configure({ placeholder }),
      ],
      content: this.hiddenTarget.value || "<p></p>",
      onUpdate: ({ editor }) => this.hiddenTarget.value = editor.getHTML(),
    })
  }

  disconnect() { this.editor?.destroy() }

  // Toolbar actions
  toggleBold()   { this.editor?.chain().focus().toggleBold().run() }
  toggleItalic() { this.editor?.chain().focus().toggleItalic().run() }
  setH2()        { this.editor?.chain().focus().toggleHeading({ level: 2 }).run() }
  setH3()        { this.editor?.chain().focus().toggleHeading({ level: 3 }).run() }
  setQuote()     { this.editor?.chain().focus().toggleBlockquote().run() }

  async insertImage() {
    const file = await this.pickFile()
    if (!file) return
    const url = await this.upload(file)
    if (url) this.editor?.chain().focus().setImage({ src: url }).run()
  }

  pickFile() {
    return new Promise(resolve => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = () => resolve(input.files[0])
      input.click()
    })
  }

  async upload(file) {
    const token = document.querySelector("meta[name=csrf-token]")?.content
    const form = new FormData()
    form.append("file", file)

    const res = await fetch("/tiptap/uploads", {
      method: "POST",
      headers: { "X-CSRF-Token": token },
      body: form
    })
    if (!res.ok) { console.error("Upload failed"); return null }
    const json = await res.json()
    return json.url
  }
}
