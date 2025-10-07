const  XlsxPopulate = require("xlsx-populate");

async function generate_report_password(data_query) {
    const workbook = await XlsxPopulate.fromBlankAsync();
    let row = 2;
    workbook.sheet(0).cell(1,1).value("RUTA");
    workbook.sheet(0).cell(1,2).value("CONTRASEÑA");
    workbook.sheet(0).cell(1,3).value("USUARIO ALTA");
    workbook.sheet(0).cell(1,4).value("FECHA");

    data_query.recordset.forEach(result => {
         workbook.sheet(0).cell(row,1).value(result.cverut);
         workbook.sheet(0).cell(row,2).value(result.paspta);
         workbook.sheet(0).cell(row,3).value(result.usralt);
         workbook.sheet(0).cell(row,4).value(result.fecalt);
        row +=1;
    });

    workbook.toFileAsync("./report.xlsx");

    return 'success';
    
}
module.exports = {generate_report_password}