const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const tasks = [
  {
    text: "Click on Trowulan",
    winText: "Trowulan",
    coordX: 2052.200073242188,
    coordY: 969.7999877929688,
    radius: 35,
  },
  {
    text: "Click on the Kudanty Camp",
    winText: "Kudanty camp",
    coordX: 2098.400024414062,
    coordY: 1046.600036621094,
    radius: 35,
  },
  {
    text: "Click on the Capital of Agrestia",
    winText: "Begnion",
    coordX: 557.1999969482422,
    coordY: 1616.400024414062,
    radius: 35,
  },
  {
    text: "Click on the Capital of Singhana Naya",
    winText: "Devipani",
    coordX: 716.8000030517578,
    coordY: 376.8000030517578,
    radius: 35,
  },
  {
    text: "Location where the Queenhammer bomb went off",
    winText: "Ruins of Janga-Daar",
    coordX: 659,
    coordY: 691.2000122070312,
    radius: 35,
  },
  {
    text: "Find the hometown of the Narrixio family",
    winText: "Ozia",
    coordX: 1273.600036621094,
    coordY: 2017,
    radius: 55,
  },
  {
    text: "Bay where Beza was first resurrected",
    winText: "Black Isles",
    coordX: 1319.200012207031,
    coordY: 581.4000091552734,
    radius: 100,
  },
  {
    text: "Aarakocra Hik was from this area",
    winText: "Giahan Mountains",
    coordX: 1676.599975585938,
    coordY: 187.3999998569489,
    radius: 300,
  },
  {
    text: "Reyes Sin Lugar main base",
    winText: "Aldeno, Lifter's Refuge",
    coordX: 1681.599975585938,
    coordY: 930.8000183105469,
    radius: 150,
  },
  {
    text: "Henning was the leader of this colony",
    winText: "Waterdeep's colony",
    coordX: 2211,
    coordY: 1109.600036621094,
    radius: 35,
  },
  {
    text: "Kingdom of Halflings allied with San",
    winText: "Corm Orp",
    coordX: 528,
    coordY: 1257.799987792969,
    radius: 100,
  },
  {
    text: "The Wild Walker's Rebellion had a secret base there",
    winText: "Land of Banelar Naga",
    coordX: 365.6000003814697,
    coordY: 1996.800048828125,
    radius: 50,
  },
  {
    text: "Hometown of El Raton",
    winText: "Port Osorio",
    coordX: 1812.599975585938,
    coordY: 1704.400024414062,
    radius: 40,
  },
  {
    text: "Sea walls that protect Begnion from a ship attack",
    winText: "The Walls of Agrestia",
    coordX: 869.8000030517578,
    coordY: 1511.599975585938,
    radius: 100,
  },
  {
    text: "Mountains where Amigo Morta is located",
    winText: "Daughter of the Sun Mountains",
    coordX: 439,
    coordY: 1389.400024414062,
    radius: 150,
  },
  {
    text: "Baldur's Gate colony in Leordis",
    winText: "Messenger Guild Outpost",
    coordX: 2214.800048828125,
    coordY: 1288.200012207031,
    radius: 35,
  },
  {
    text: "Luskan's colony in Leordis",
    winText: "Port Perfectone",
    coordX: 2112.599975585938,
    coordY: 850,
    radius: 35,
  },
  {
    text: "Land ruled by Tsili of Kahanga",
    winText: "Han, Keepers of Tsili",
    coordX: 1368.200012207031,
    coordY: 399.7999992370605,
    radius: 300,
  },
  {
    text: "Rough location of the first aggressive move of Singhana",
    winText: "Singhana's invasion of Kahanga",
    coordX: 1022.799987792969,
    coordY: 307.4000015258789,
    radius: 200,
  },
  {
    text: "Location in Leordis with the most deserts",
    winText: "Singhana Naya",
    coordX: 365,
    coordY: 477.2000007629395,
    radius: 400,
  },
  {
    text: "Bay where I.G. commanded final siege of Promised War",
    winText: "Siege of Devipani",
    coordX: 786.2000122070312,
    coordY: 523.3999938964844,
    radius: 170,
  },
  {
    text: "Currently known as the Crossings Island",
    winText: "Crossings Island",
    coordX: 2388,
    coordY: 1731.400024414062,
    radius: 200,
  },
  {
    text: "Rough location of the Lost Duape City",
    winText: "Lost Duape City of Ukai",
    coordX: 2389.8,
    coordY: 236,
    radius: 400,
  },
  {
    text: "City which Singhana turned into its food stockpile",
    winText: "Conquered Ardester",
    coordX: 1358.799987792969,
    coordY: 539.7999992370605,
    radius: 40,
  },
  {
    text: "Location of Soleira Prestigia",
    winText: "Soleira Prestigia",
    coordX: 559.2000122070312,
    coordY: 1591.800048828125,
    radius: 40,
  },
  {
    text: "Location of the Guild of Starshapers",
    winText: "Guild of Starshapers",
    coordX: 2051.400024414062,
    coordY: 969.4,
    radius: 40,
  },
  {
    text: "Entrance to demiplane Metronium was hidden in this ruined city",
    winText: "Metronium entrance",
    coordX: 659.2000122070312,
    coordY: 695,
    radius: 50,
  },
  {
    text: "Rylanor was first executed in this location",
    winText: "Rylanor's execution",
    coordX: 717.8,
    coordY: 378,
    radius: 40,
  },
  {
    text: "Click on Calimshan's colony",
    winText: "Calimshan's colony",
    coordX: 2007.599975585938,
    coordY: 1505.8,
    radius: 40,
  },
];

async function main() {
  console.log("Seeding tasks...");
  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }
  console.log("All tasks seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
