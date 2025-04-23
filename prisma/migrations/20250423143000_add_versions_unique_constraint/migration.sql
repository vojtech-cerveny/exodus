-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "Versions_userId_type_key" ON "Versions"("userId", "type");