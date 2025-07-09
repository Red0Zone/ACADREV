const fs = require("fs").promises;
const path = require("path");

/**
 * Utility functions for file operations
 */

/**
 * Safely delete a file from the file system
 * @param {string} filePath - The path to the file to delete
 * @returns {Promise<boolean>} - True if file was deleted, false if it didn't exist
 */
const deleteFileIfExists = async (filePath) => {
  try {
    // Check if file exists
    await fs.access(filePath);
    // Delete the file
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      // File doesn't exist, which is fine
      return false;
    }
    // Re-throw other errors
    throw error;
  }
};

/**
 * Delete multiple files and return results
 * @param {Array<string>} filePaths - Array of file paths to delete
 * @returns {Promise<Object>} - Object with deletion results
 */
const deleteMultipleFiles = async (filePaths) => {
  const results = {
    deleted: [],
    notFound: [],
    errors: [],
  };

  const deletePromises = filePaths.map(async (filePath) => {
    try {
      const deleted = await deleteFileIfExists(filePath);
      if (deleted) {
        results.deleted.push(filePath);
      } else {
        results.notFound.push(filePath);
      }
    } catch (error) {
      results.errors.push({
        filePath,
        error: error.message,
      });
    }
  });

  await Promise.allSettled(deletePromises);
  return results;
};

/**
 * Construct full file path from relative location
 * @param {string} location - Relative file location from database
 * @returns {string} - Full file path
 */
const getFullFilePath = (location) => {
  // Remove leading slash if present
  const cleanLocation = location.startsWith("/")
    ? location.substring(1)
    : location;
  return path.join(__dirname, "..", cleanLocation);
};

module.exports = {
  deleteFileIfExists,
  deleteMultipleFiles,
  getFullFilePath,
};
