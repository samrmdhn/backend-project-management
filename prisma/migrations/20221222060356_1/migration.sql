-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,
    `work_status` BOOLEAN NULL,
    `work_long` INTEGER NULL,
    `work_start` DATETIME(3) NULL,
    `work_end` DATETIME(3) NULL,
    `handphone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Projects` (
    `id` VARCHAR(191) NOT NULL,
    `client` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL,
    `project_status` BOOLEAN NOT NULL,
    `project_start` DATETIME(3) NOT NULL,
    `project_long` INTEGER NULL,
    `project_end` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectsToUsers` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectsToUsers_AB_unique`(`A`, `B`),
    INDEX `_ProjectsToUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProjectsToUsers` ADD CONSTRAINT `_ProjectsToUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectsToUsers` ADD CONSTRAINT `_ProjectsToUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
