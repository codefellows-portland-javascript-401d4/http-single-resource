http-single-resource is a representation of a simple two-page website served by a single data resource (SDR) where the /teams page features a variety of GET, POST, and DELETE functionality.

It GETs a list of all teams on entry or only a single team if queried by team from the SDR.

It POSTs new teams to the SDR.

It PUTs revisions to the city of an existing team to the SDR.

It DELETEs a team's entry from the SDR.
	
It requires http, parseUrl, fs, and qs from node, the sander module, and a bodyReader module lifted from my Code Fellows 401 class.

There is a Mocha/Chai (with http add-in)/eslint test for this process in the 'test' folder.

ISC License (ISC)
Copyright (c) 2016, Gregory N. Katchmar <gunk55@msn.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.



