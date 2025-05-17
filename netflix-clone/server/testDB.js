const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addUser() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "yourSecurePassword123"  // Provide an actual password string
      }
    });
    console.log("User added:", user);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

addUser();
