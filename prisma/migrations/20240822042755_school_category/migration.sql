/*
  Warnings:

  - You are about to alter the column `school` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `school` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Player` MODIFY `school` ENUM('PROSTRIDE', 'RAD', 'GOLDCORE', 'PUCKS_FOR_PUPS') NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `school` ENUM('PROSTRIDE', 'RAD', 'GOLDCORE', 'PUCKS_FOR_PUPS') NOT NULL;
