-- AlterTable
ALTER TABLE `Vote` ADD COLUMN `coachId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Vote_coachId_fkey` ON `Vote`(`coachId`);

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_coachId_fkey` FOREIGN KEY (`coachId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
