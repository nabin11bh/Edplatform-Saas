import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

const ensureCategoryTable = async (instituteNumber: number) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS category_${instituteNumber} (
      id INT AUTO_INCREMENT PRIMARY KEY,
      categoryName VARCHAR(255) NOT NULL,
      categoryDescription TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  await sequelize.query(createTableQuery);
};

const createCategory = async (req: IExtendedRequest, res: Response) => {
  const instituteNumberRaw = req.user?.currentInstituteNumber;

  if (!instituteNumberRaw) {
    return res.status(400).json({ message: "Institute number missing in token." });
  }

  const instituteNumber = Number(instituteNumberRaw);

  if (isNaN(instituteNumber)) {
    return res.status(400).json({ message: "Invalid institute number." });
  }

  const { categoryName, categoryDescription } = req.body;

  if (!categoryName || !categoryDescription) {
    return res.status(400).json({
      message: "Please provide categoryName, categoryDescription",
    });
  }

  try {
    await ensureCategoryTable(instituteNumber);

    await sequelize.query(
      `INSERT INTO category_${instituteNumber} (categoryName, categoryDescription) VALUES (?, ?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [categoryName, categoryDescription],
      }
    );

    const categories: { id: number; createdAt: Date }[] = await sequelize.query(
      `SELECT id, createdAt FROM category_${instituteNumber} WHERE categoryName = ? ORDER BY createdAt DESC LIMIT 1`,
      {
        replacements: [categoryName],
        type: QueryTypes.SELECT,
      }
    );

    if (categories.length === 0) {
      return res.status(500).json({ message: "Failed to fetch inserted category." });
    }

    const insertedCategory = categories[0];

    res.status(200).json({
      message: "Category added successfully",
      data: {
        categoryName,
        categoryDescription,
        id: insertedCategory.id,
        createdAt: insertedCategory.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCategories = async (req: IExtendedRequest, res: Response) => {
  const instituteNumberRaw = req.user?.currentInstituteNumber;

  if (!instituteNumberRaw) {
    return res.status(400).json({ message: "Institute number missing in token." });
  }

  const instituteNumber = Number(instituteNumberRaw);

  if (isNaN(instituteNumber)) {
    return res.status(400).json({ message: "Invalid institute number." });
  }

  try {
    await ensureCategoryTable(instituteNumber);

    const categories = await sequelize.query(`SELECT * FROM category_${instituteNumber}`, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req: IExtendedRequest, res: Response) => {
  const instituteNumberRaw = req.user?.currentInstituteNumber;
  const id = req.params.id;

  if (!instituteNumberRaw) {
    return res.status(400).json({ message: "Institute number missing in token." });
  }

  const instituteNumber = Number(instituteNumberRaw);

  if (isNaN(instituteNumber)) {
    return res.status(400).json({ message: "Invalid institute number." });
  }

  try {
    await ensureCategoryTable(instituteNumber);

    await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id = ?`, {
      type: QueryTypes.DELETE,
      replacements: [id],
    });

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createCategory, getCategories, deleteCategory }