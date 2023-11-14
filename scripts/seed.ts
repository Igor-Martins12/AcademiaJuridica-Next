const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try { 
        const categories = [
            "Pós graduação em Direito Previdenciario",
            "Direito do Consumidor",
            "Direito Trabalhista",
            "Direito Contratual",
            "Direito Civil",
            "Direito Ambiental",
            "Direito Empresarial",
            "Direito da Tecnologia da Informação",
            "Direito Penal",
        ];
        for (const name of categories) {
            const existingCategory = await database.category.findUnique({
                where: { name },
            });

            if (!existingCategory) {
                await database.category.create({ data: { name } });
            }
        }

        console.log("Sucesso");
    } catch (error) {
        console.log("Erro ao propagar as categorias do banco de dados", error);
    } finally {
        await database.$disconnect();
    }
}

main();