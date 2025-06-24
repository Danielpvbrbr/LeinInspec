export function formatarDataBr(dataIso) {
    if (dataIso) {
      let [date, hora] = dataIso.split(" ")
      let [ano, mes, dia] = date.split("-")
      return `${dia}/${mes}/${ano} ${hora} `
    }

    return ''
  }