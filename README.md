TransformNPBMP simply inverts the colors of any 24-bit .bmp file.
	
Its only requirement is node's fs command set.

Simply feed it the full file name for the .bmp (e.g. 'data/blah-blah.bmp') ('buffer')' and it will color-invert
and write a new 'trans'-prefixed version of the file.

There is a Mocha/Chai/eslint test for this process in the 'test' folder.

ISC License (ISC)
Copyright (c) 2016, Gregory N. Katchmar <gunk55@msn.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.



