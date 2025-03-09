/**
 * Migration script to help convert Flask templates to EJS
 * 
 * This script can be used to automate the conversion of Flask/Jinja2 templates
 * to EJS templates for the Node.js version of the website.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

// Source and destination directories
const sourceDir = path.join(__dirname, '..', 'templates');
const destDir = path.join(__dirname, 'views');

// Ensure destination directory exists
async function ensureDir(dir) {
    try {
        await mkdir(dir, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
}

// Convert Jinja2 syntax to EJS syntax
function convertToEjs(content) {
    // Replace Jinja2 block statements with EJS includes
    content = content.replace(/{%\s*block\s+title\s*%}(.*?){%\s*endblock\s*%}/g, '<%= title %>');
    
    // Replace Jinja2 extends with EJS layout
    content = content.replace(/{%\s*extends\s+['"]base\.html['"]\s*%}/g, '<%- include(\'partials/header\', { title: title }) %>');
    
    // Replace Jinja2 block content with EJS body
    content = content.replace(/{%\s*block\s+content\s*%}([\s\S]*?){%\s*endblock\s*%}/g, '$1\n<%- include(\'partials/footer\') %>');
    
    // Replace Jinja2 variables with EJS variables
    content = content.replace(/{{(.*?)}}/g, '<%=$1%>');
    
    // Replace Jinja2 if statements
    content = content.replace(/{%\s*if\s+(.*?)\s*%}/g, '<% if ($1) { %>');
    content = content.replace(/{%\s*else\s*%}/g, '<% } else { %>');
    content = content.replace(/{%\s*endif\s*%}/g, '<% } %>');
    
    // Replace Jinja2 for loops
    content = content.replace(/{%\s*for\s+(.*?)\s+in\s+(.*?)\s*%}/g, '<% $2.forEach(function($1) { %>');
    content = content.replace(/{%\s*endfor\s*%}/g, '<% }); %>');
    
    // Replace url_for with direct paths
    content = content.replace(/url_for\(['"]static['"],\s*filename=['"]css\/(.*?)['"]\)/g, '/css/$1');
    content = content.replace(/url_for\(['"]static['"],\s*filename=['"]js\/(.*?)['"]\)/g, '/js/$1');
    content = content.replace(/url_for\(['"]static['"],\s*filename=['"]images\/(.*?)['"]\)/g, '/images/$1');
    
    return content;
}

// Process a single file
async function processFile(file) {
    try {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file.replace('.html', '.ejs'));
        
        // Read the source file
        const content = await readFile(sourcePath, 'utf8');
        
        // Convert the content
        const convertedContent = convertToEjs(content);
        
        // Write the converted content to the destination file
        await writeFile(destPath, convertedContent);
        
        console.log(`Converted ${file} to ${file.replace('.html', '.ejs')}`);
    } catch (err) {
        console.error(`Error processing ${file}:`, err);
    }
}

// Main function to process all files
async function migrateTemplates() {
    try {
        // Ensure destination directory exists
        await ensureDir(destDir);
        
        // Get all HTML files in the source directory
        const files = await readdir(sourceDir);
        const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'base.html');
        
        // Process each file
        for (const file of htmlFiles) {
            await processFile(file);
        }
        
        console.log('Migration completed successfully!');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

// Run the migration
migrateTemplates(); 