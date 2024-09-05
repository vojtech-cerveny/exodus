-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('GOOD', 'NEUTRAL', 'SAD');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('NO_INFORMATION', 'DONE', 'NOT_DONE');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "brotherhoodId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Brotherhood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "createdBy" TEXT,

    CONSTRAINT "Brotherhood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrotherhoodInvitation" (
    "id" TEXT NOT NULL,
    "brotherhoodId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT NOT NULL,

    CONSTRAINT "BrotherhoodInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrotherhoodProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exercise" "State" NOT NULL DEFAULT 'NO_INFORMATION',
    "shower" "State" NOT NULL DEFAULT 'NO_INFORMATION',
    "asceticism" "State" NOT NULL DEFAULT 'NO_INFORMATION',
    "overallMood" "Mood" NOT NULL,
    "prayer" "Mood" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "lastUpdateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BrotherhoodProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "passage" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "note" TEXT,
    "sharedWithBrotherhood" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BrotherhoodMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "BrotherhoodInvitation_token_key" ON "BrotherhoodInvitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "BrotherhoodInvitation_id_key" ON "BrotherhoodInvitation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BrotherhoodInvitation_brotherhoodId_key" ON "BrotherhoodInvitation"("brotherhoodId");

-- CreateIndex
CREATE UNIQUE INDEX "BrotherhoodProgress_date_userId_key" ON "BrotherhoodProgress"("date", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BrotherhoodMembers_AB_unique" ON "_BrotherhoodMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_BrotherhoodMembers_B_index" ON "_BrotherhoodMembers"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Brotherhood" ADD CONSTRAINT "Brotherhood_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrotherhoodInvitation" ADD CONSTRAINT "BrotherhoodInvitation_brotherhoodId_fkey" FOREIGN KEY ("brotherhoodId") REFERENCES "Brotherhood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BrotherhoodProgress" ADD CONSTRAINT "BrotherhoodProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrotherhoodMembers" ADD CONSTRAINT "_BrotherhoodMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "Brotherhood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrotherhoodMembers" ADD CONSTRAINT "_BrotherhoodMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
