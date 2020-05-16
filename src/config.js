global.SALT_KEY = 'f5b99242-6504-4ca3-90f2-05e78e5761ef'
global.EMAIL_TMPL = 'Olá <strong>{0}</strong> seu fdp'

module.exports = {
    //connectionString:'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',
    connectionString:'mongodb+srv://filipe:filipe@cluster0-h2qys.mongodb.net/node-str?retryWrites=true&w=majority', // conexao com o banco
    sendgridKey: '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', // conexao com o sandgrid
    containerConnectionString:'DefaultEndpointsProtocol=https;AccountName=nodestr2;AccountKey=hIZS0SLE2LV4DXF9vNDNolTgS1fMiy4rWfCBGseieC/+gjD38kg9L6LSWMcyn14VwFOn7sFh77gzZ36888B2Tw==;EndpointSuffix=core.windows.net' // conexao com o azure repository
}
