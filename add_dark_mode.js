const fs = require('fs');
const path = require('path');

const targetFiles = process.argv.slice(2);

const replacements = [
    { from: /\bbg-white\b(?! dark:)/g, to: 'bg-white dark:bg-gray-800' },
    { from: /\bbg-gray-50\b(?! dark:)/g, to: 'bg-gray-50 dark:bg-gray-900/50' },
    { from: /\bbg-slate-50\b(?! dark:)/g, to: 'bg-slate-50 dark:bg-gray-900' },
    { from: /\btext-gray-900\b(?! dark:)/g, to: 'text-gray-900 dark:text-white' },
    { from: /\btext-gray-800\b(?! dark:)/g, to: 'text-gray-800 dark:text-gray-100' },
    { from: /\btext-gray-700\b(?! dark:)/g, to: 'text-gray-700 dark:text-gray-200' },
    { from: /\btext-gray-600\b(?! dark:)/g, to: 'text-gray-600 dark:text-gray-300' },
    { from: /\btext-gray-500\b(?! dark:)/g, to: 'text-gray-500 dark:text-gray-400' },
    { from: /\bborder-gray-100\b(?! dark:)/g, to: 'border-gray-100 dark:border-gray-700/50' },
    { from: /\bborder-gray-200\b(?! dark:)/g, to: 'border-gray-200 dark:border-gray-700' },
    { from: /\bborder-gray-300\b(?! dark:)/g, to: 'border-gray-300 dark:border-gray-600' },
    { from: /\bborder-white\b(?! dark:)/g, to: 'border-white dark:border-gray-800' },
    { from: /\bbg-purple-50\b(?! dark:)/g, to: 'bg-purple-50 dark:bg-purple-900/20' },
    { from: /\bbg-purple-100\b(?! dark:)/g, to: 'bg-purple-100 dark:bg-purple-900/30' },
    { from: /\btext-purple-600\b(?! dark:)/g, to: 'text-purple-600 dark:text-purple-400' },
    { from: /\bhover:bg-gray-50\b(?! dark:)/g, to: 'hover:bg-gray-50 dark:hover:bg-gray-700/50' },
    { from: /\bhover:bg-gray-100\b(?! dark:)/g, to: 'hover:bg-gray-100 dark:hover:bg-gray-700' },
    { from: /\bhover:bg-purple-50\b(?! dark:)/g, to: 'hover:bg-purple-50 dark:hover:bg-purple-900/30' },
    { from: /\bdivide-gray-100\b(?! dark:)/g, to: 'divide-gray-100 dark:divide-gray-700/50' },
    { from: /\bdivide-gray-200\b(?! dark:)/g, to: 'divide-gray-200 dark:divide-gray-700' },
    // A broader text-gray catch for general usage that might be missed
];

targetFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    replacements.forEach(({from, to}) => {
        content = content.replace(from, to);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated $\\{file}`);
    } else {
        console.log(`No changes needed for $\\{file}`);
    }
});
