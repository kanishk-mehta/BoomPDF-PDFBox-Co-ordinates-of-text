# PDFBox-Co-ordinates-of-text
This PDFBox wrapper that can be used for extracting text and text co-ordinates from a printed PDF doc (no OCR)

## Dependencies

* [Nodejs 8 or above](https://nodejs.org/en/)
* [JRE 8 or above](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)
* [PDFBox v2 or above](https://pdfbox.apache.org/) - only if you want to build from source

> Note: Neither the binaries, nor the source files will work without the *Java Runtime Environment (JRE)*

## Instructions + Syntax (Windows)

After cloning the repository, copy the ```main_java.exe``` and the ```BoomPdf.jar``` files to the desired folder. Make sure you have nodejs installed and then run the following code in the ```command prompt```: 

```
$ node main_java.exe "Absolute Path of the PDF" FromPage ToPage
```
Where ```FromPage``` is the first page you want to convert and ```ToPage``` is the end page

### From Source (Linux and OS X)
Out of the box, ```BoomPdf.java``` returns each glyph/alphabet and special character with coordinates.

If you're building the code from Source, please download the PDFBox jar and use the ```BoomPdf.java``` file to customize your solution. 

Further customization in the output can be done by altering the ```main_java.js``` file. This is the Node.js code that parses the text and returns words with their coordinates (the left-most character's position is taken for reference)