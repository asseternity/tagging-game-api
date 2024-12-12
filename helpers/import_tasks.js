const tasks = require("./tasks");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Transform the task data to match the Prisma model
  const formattedTasks = tasks.map((task) => ({
    text: task.text,
    winText: task.winText,
    coordX: task.coords.x,
    coordY: task.coords.y,
    radius: task.radius,
  }));

  // Insert tasks in bulk
  await prisma.task.createMany({
    data: formattedTasks,
    skipDuplicates: true, // Optional: skips tasks with duplicate unique constraints
  });

  console.log("Tasks added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
