units.js
========

**units.js** is a minimal javascript library for working with units conversions.

Usage
-----

Include the library in your html

    <script type="text/javascript" src="units.js"></script>

Use the `units.convert` method, like so:

    // Converting 3 ft to meters:
    var result = units.convert(3, 'ft', 'm');

You can chain simple units, separated with hyphens, to form compund ones:

    // Converting 9.2 kg*m to lb*ft
    var result = units.convert(9.2, 'kg-m', 'lb-ft');

Units prefixed with an underscore are interpreted as their reciprocal:

    // Converting 175 usd / (year*ft2) to mxn / (month*m2)
    var result = units.convert(175, 'usd-_year-_ft2', 'mxn-_month-_m2');

To change the established equivalence for a unit, or to define a new one, use the `units.define` method:

    // Defining a new unit, rmb, which value is 0.1572 usd.
    units.define('rmb', 'usd', 0.1572);

Download
--------

* [units.js v0.1](https://github.com/jairtrejo/units.js/raw/master/units.js)
* [units.min.js v0.1](https://github.com/jairtrejo/units.js/raw/master/units.min.js) - minified with yui compressor.
* [github repository](https://github.com/jairtrejo/units.js)

Licensing
---------
**unit.js** is released under the MIT License, as can be found here: [MIT License](http://www.opensource.org/licenses/MIT).

About the author
----------------
**unit.js** is a project by [Jair Trejo](http://jairtrejo.mx).
