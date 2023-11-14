const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try { 
       await database.category.createMany({
        data: [
            {name: "Pós graduação em direito previdenciario"},
            {name: "Direito do Consumidor"},
            {name: "Direito Trabalhista"},
            {name: "Direito Contratual"},
            {name: "Direito Civil"},
            {name: "Direito Ambiental"},
            {name: "Direito Empresarial"},
            {name: "Direito da Tecnologia da Informação"},
        ]
       });
       console.log("Sucesso")
    } catch (error) {
        console.log("Erro ao propagar as categorias do banco de dados", error);
    } finally {
        await database.$disconnect();
    }
}

main();