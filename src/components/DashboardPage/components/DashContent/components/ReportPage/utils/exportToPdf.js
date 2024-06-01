import { jsPDF as JsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export const exportToPdf = (htmlId, setLoading) => {
  setLoading({ show: true })
  const htmlSource = document.getElementById(htmlId)
  const filename = 'Relatorio-de-vendas-Urban-Sneakers'

  if (!htmlSource) {
    return
  }

  html2canvas(htmlSource)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 180
      const pageHeight = 297

      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 5
      const pdf = new JsPDF('p', 'mm')

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      setLoading({ show: false })
      pdf.save(filename)
    })
}
