const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addUser() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com"
      },
    });
    console.log("✅ User added:", user);
  } catch (error) {
    console.error("⚠️ Error adding user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addUser();
