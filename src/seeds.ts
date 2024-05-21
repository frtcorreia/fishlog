import prisma from "./prismaClient";

async function main() {
  await prisma.role.createMany({
    data: [{ description: "admin" }, { description: "angler" }],
    skipDuplicates: true,
  });

  console.log("Roles seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
