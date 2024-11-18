import fs from 'fs';

function readFileContent(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        callback();
    });
}

function createUppercaseFile(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const uppercasedContent = data.toUpperCase();
        console.log(uppercasedContent);
        fs.writeFile('uppercase.txt', uppercasedContent, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            fs.writeFile('processedFiles.txt', 'uppercase.txt', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                callback();
            });
        });
    });
}

function createLowercaseFile(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const lowercasedContent = data.toLowerCase();
        const formattedContent = lowercasedContent.split(', ').join('\n');
        console.log(formattedContent);
        fs.writeFile('lowercase.txt', formattedContent, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            fs.appendFile('processedFiles.txt', '\nlowercase.txt', (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Lowercase file created successfully.');
                callback();
            });
        });
    });
}

function createSortedFile(fileListPath, callback) {
    fs.readFile(fileListPath, 'utf-8', (err, fileList) => {
        if (err) {
            console.error(err);
            return;
        }
        const filePaths = fileList.split('\n');
        let sortedContent = [];
        let processedFiles = 0;

        filePaths.forEach((path) => {
            fs.readFile(path, 'utf8', (err, content) => {
                if (err) {
                    console.error(err);
                    return;
                }
                sortedContent.push(content.split('\n'));
                processedFiles++;

                if (processedFiles === filePaths.length) {
                    sortedContent = sortedContent.flat();
                    sortedContent = sortedContent.sort((a, b) =>
                        a.toLowerCase().localeCompare(b.toLowerCase())
                    ).join('\n');
                    fs.writeFile('sorted.txt', sortedContent, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        fs.appendFileSync('processedFiles.txt', '\nsorted.txt');
                        callback();
                    });
                }
            });
        });
    });
}

function deleteAllFiles(fileListPath) {
    fs.readFile(fileListPath, 'utf-8', (err, fileList) => {
        if (err) {
            console.error(err);
            return;
        }
        const filePaths = fileList.split('\n');
        filePaths.forEach((file) => {
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Deleted ${file}`);
            });
        });
    });
}

const inputFilePath = 'lipsum.txt';
const uppercaseFilePath = 'uppercase.txt';
const fileListPath = 'processedFiles.txt';

export function main() {
    readFileContent(inputFilePath, () => {
        createUppercaseFile(inputFilePath, () => {
            createLowercaseFile(uppercaseFilePath, () => {
                createSortedFile(fileListPath, () => {
                    deleteAllFiles(fileListPath);
                });
            });
        });
    });
}

// main();
