units.js
========

**units.js** is a minimal javascript library for working with units conversions.

Usage
-----

Include the library in your html

<pre>
    <code class="language-html">
    <script type="text/javascript" src="units.js"></script>
    </code>
</pre>

Use the `units.convert` method, like so:

<pre>
    <code class="language-javascript">
    // Converting 3 ft to meters:
    var result = units.convert(3, 'ft', 'm');
    </code>
</pre>

You can chain simple units, separated with hyphens, to form compund ones:

<pre>
    <code class="language-javascript">
    // Converting 9.2 kg*m to lb*ft
    var result = units.convert(9.2, 'kg-m', 'lb-ft');
    </code>
</pre>

Units prefixed with an underscore are interpreted as their reciprocal:

<pre>
    <code class="language-javascript">
    // Converting 175 usd / (year*ft2) to mxn / (month*m2)
    var result = units.convert(175, 'usd-_year-_ft2', 'mxn-_month-_m2');
    </code>
</pre>

To change the established equivalence for a unit, or to define a new one, use the `units.define` method:

<pre>
    <code class="language-javascript">
    // Defining a new unit, rmb, which value is 0.1572 usd.
    units.define('rmb', 'usd', 0.1572);
    </code>
</pre>

Download
--------

* [units.js v0.1]()
* [units.min.js v0.1]() - minified with yui compressor.
* [github repository]()

Licensing
---------
**unit.js** is released under the MIT License, as can be found here: [MIT License](http://www.opensource.org/licenses/MIT).

About the author
----------------
**unit.js** is a project by [Jair Trejo](http://jairtrejo.mx).
