/*
  Warnings:

  - You are about to alter the column `position` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Player` MODIFY `position` ENUM('FORWARD', 'DEFENSEMAN', 'GOALIE') NOT NULL;
