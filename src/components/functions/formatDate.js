export function formatDate() {
    const date = new Date()
    const dateLc = date.toLocaleDateString()
    let [dia, mes, ano] = dateLc.split("/")
    const dataForm = `${ano}-${mes}-${dia}`

    return `${dataForm} ${date.toLocaleTimeString()}`
}