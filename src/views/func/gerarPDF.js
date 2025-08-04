import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const safe = (value) => (value != null ? String(value) : "—");

const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(new Date(dateString));
    } catch {
        return "Data inválida";
    }
};

const parseChecklist = (listCheckout) => {
    try {
        const lista = JSON.parse(listCheckout);
        return lista.map((item) => [safe(item.name), item.check ? "OK" : "Ruim"]);
    } catch {
        return [["Erro", "Falha ao ler os itens"]];
    }
};

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_LEFT = 14;
const MARGIN_RIGHT = 14;
const MARGIN_TOP = 25;
const MARGIN_BOTTOM = 25;
const TABLE_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT; // 182

// Cabeçalho em cada página
const addHeader = (doc, pageNumber) => {
    doc.setFontSize(12);
    doc.setTextColor("#1565c0"); // azul escuro
    doc.setFont(undefined, "bold");
    doc.text("LeinInspec — Sistema para Inspeção e Controle de Veículos", PAGE_WIDTH / 2, 15, { align: "center" });

    // Linha abaixo do cabeçalho
    doc.setDrawColor("#1565c0");
    doc.setLineWidth(0.7);
    doc.line(MARGIN_LEFT, 20, PAGE_WIDTH - MARGIN_RIGHT, 20);

    // Número da página no canto direito do cabeçalho
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.setTextColor("#999");
    doc.text(`Página ${pageNumber}`, PAGE_WIDTH - MARGIN_RIGHT, 15, { align: "right" });
};

// Rodapé em cada página
const addFooter = (doc, pageNumber) => {
    const ano = new Date().getFullYear();
    // Linha acima do rodapé
    doc.setDrawColor("#1565c0");
    doc.setLineWidth(0.7);
    doc.line(MARGIN_LEFT, PAGE_HEIGHT - MARGIN_BOTTOM + 5, PAGE_WIDTH - MARGIN_RIGHT, PAGE_HEIGHT - MARGIN_BOTTOM + 5);

    doc.setFontSize(9);
    doc.setTextColor("#555");
    doc.setFont(undefined, "normal");
    doc.text(`© ${ano} Disnibra - Todos os direitos reservados`, PAGE_WIDTH / 2, PAGE_HEIGHT - MARGIN_BOTTOM + 12, { align: "center" });

    // Marca registrada LeinSystem (menor e no canto esquerdo)
    doc.setFontSize(8);
    doc.setTextColor("#999");
    doc.text("Desenvolvido por LeinSystem ™", MARGIN_LEFT, PAGE_HEIGHT - MARGIN_BOTTOM + 12);
};


const addMainInfoTable = (doc, data, startY) => {
    autoTable(doc, {
        startY,
        head: [["Campo", "Valor"]],
        body: [
            ["Condutor", safe(data.condutor)],
            ["Usuário", safe(data.usuario)],
            ["Veículo", safe(data.veiculo)],
            ["Placa", safe(data.placa)],
            ["Observações", safe(data.observacao)],
        ],
        theme: "grid",
        styles: { fontSize: 10 },
        tableWidth: TABLE_WIDTH,
        columnStyles: {
            0: {
                cellWidth: 60,
                overflow: "ellipsize",
                whiteSpace: "nowrap",
                fontStyle: "bold",
                cellPadding: 2,
            },
            1: {
                cellWidth: TABLE_WIDTH - 60,
                overflow: "linebreak",
                whiteSpace: "normal",
            },
        },
    });
};

const addChecklistTable = (doc, checklist, startY) => {
    autoTable(doc, {
        startY,
        head: [["Item Verificado", "Status"]],
        body: checklist,
        styles: { fontSize: 10 },
        headStyles: {
            fillColor: [21, 101, 192],
            textColor: 255,
            fontStyle: "bold",
        },
        tableWidth: TABLE_WIDTH,
        columnStyles: {
            0: {
                cellWidth: TABLE_WIDTH - 30,
                overflow: "linebreak",
                whiteSpace: "normal",
            },
            1: {
                cellWidth: 30,
                overflow: "ellipsize",
                whiteSpace: "nowrap",
                fontStyle: "bold",
            },
        },
    });
};

export const gerarPDF = ({ listCheck }) => {
    const doc = new jsPDF();

    // Função para desenhar cabeçalho e rodapé em cada página (usada no evento didDrawPage)
    const drawHeaderFooter = (data) => {
        const pageNumber = doc.getCurrentPageInfo().pageNumber;
        addHeader(doc, pageNumber);
        addFooter(doc, pageNumber);
    };

    listCheck.forEach((v, index) => {
        if (index > 0) doc.addPage();

        // Configurações da página para autoTable (margens para não sobrepor cabeçalho/rodapé)
        const marginTopTable = MARGIN_TOP + 10; // espaço extra para o título

        // Cabeçalho do relatório específico
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.setTextColor("#333");
        doc.text(`Check list de veículos Dinsibra #${index + 1}`, MARGIN_LEFT, marginTopTable - 6);

        doc.setFontSize(11);
        doc.setFont(undefined, "normal");
        const dataFormatada = formatDate(v.dataHora);
        doc.text(`Data: ${dataFormatada}`, MARGIN_LEFT, marginTopTable);

        addMainInfoTable(doc, v, marginTopTable + 5);

        const checklist = parseChecklist(v.listCheckout);

        addChecklistTable(doc, checklist, doc.lastAutoTable.finalY + 10);

        // Linha de assinatura no final da página (pelo menos 30 mm do rodapé)
        const assinaturaY = Math.max(doc.lastAutoTable.finalY + 20, PAGE_HEIGHT - MARGIN_BOTTOM - 30);
        const linhaLargura = 70;
        const linhaXInicio = (PAGE_WIDTH - linhaLargura) / 2;

        doc.setLineWidth(0.6);
        doc.setDrawColor("#1565c0");
        doc.line(linhaXInicio, assinaturaY, linhaXInicio + linhaLargura, assinaturaY);

        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.setTextColor("#1565c0");
        doc.text("Responsável", PAGE_WIDTH / 2, assinaturaY + 7, { align: "center" });

        // Chama cabeçalho e rodapé da página atual
        drawHeaderFooter();
    });

    doc.save("LeinInspec.pdf");
};
