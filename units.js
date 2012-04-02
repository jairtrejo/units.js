/*
 * units.js javascript library.
 * version 0.1.2
 *
 * Copyright (c) 2011 by Jair Trejo.
 * Released under the MIT License - http://www.opensource.org/licenses/MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


(function(root){

    // Local library object, where we store all our exported functions.
    var lib = {};

    /*
     * Equivalence table construction.
     *
     * Each entry is of the form:
     *
     * unit_symbol : { base : base_unit_symbol, mu : number_of_units_in_base_unit }
     *
     */

    // Base equivalence table.
    var eqs = {
        // Mass
        'kg' : { base : 'kg', mu : 1.0 },
        'lb' : { base : 'kg', mu : 0.454 },
        /* Length */
        'm' : { base : 'm', mu : 1.0 },
        'ft' : { base : 'm', mu : 0.3048 },
        /* Area */
        'm2' : { base : 'm2', mu : 1.0 },
        'ft2' : { base : 'm2', mu : 0.3048 * 0.3048 },
        /* Time */
        'month' : { base : 'month', mu : 1.0 },
        'year' : { base : 'month', mu : 12 },
        /* Currency */
        'mxn' : { base : 'usd', mu : 1 / 14.0 },
        'usd' : { base : 'usd', mu : 1.0 }
    };

    // For every unit u, we add it's reciprocal (1 / u) to the equivalence table.
    (function() {
        var inverse = {};
        for(var eq in eqs){
            if(eqs.hasOwnProperty(eq)){
                var u = eqs[eq];
                inverse['_' + eq] = { base : '_' + u.base, 'mu' : 1.0 / u.mu };
            }
        }
        for(var eq in inverse){
            if(inverse.hasOwnProperty(eq)){
                eqs[eq] = inverse[eq];
            }
        }
    }());

    /*
     * Helpers
     */

    // Takes a units string and returns a list of units (keys in the equivalence table)
    var extract_units = function(units_string){
        return units_string.split('-');
    };

    /*
     * API methods
     */

    /**
     * units.convert(val, from, to)
     *
     * Converts the value 'val' from units specified in the units
     * string 'from' to units specified in the units string 'to'.
     *
     * The units strings are of the form u1-u2-u3-...-un where u1...n
     * are keys in the equivalences table.
     *
     * Example:
     *
     * Converting 3 ft to meters:
     *
     *    var result = units.convert(3, 'ft', 'm');
     *
     * Converting 175 usd / (year * ft2) to mxn / (month * m2)
     *
     *    var result = units.convert(175, 'usd-_year-_ft2', 'mxn-_month-_m2');
     */
    var convert = lib.convert = function(val, from, to){

        var res = val;

        var ufs = extract_units(from);
        var uts = extract_units(to);

        if(uts.length != ufs.length){
            throw new Error('convert(val, from, to): ' +
                            'The number of to and from units doesn\'t match.');
        }

        for(var i = 0; i < ufs.length; ++i){
            var uf = ufs[i],
                ut = uts[i];
            if( !eqs.hasOwnProperty(uf) ){
                throw new Error('convert(val, from, to): ' +
                                'unit ' + uf + ' not found.');
            }
            if( !eqs.hasOwnProperty(ut) ){
                throw new Error('convert(val, from, to): ' +
                                'unit ' + ut + ' not found.');
            }
            if( eqs[uf].base !== eqs[ut].base ){
                throw new Error('convert(val, from, to): ' +
                                'Bases don\'t match for units ' + uf + ' and ' + ut + '.');
            }
            res *= eqs[uf].mu / eqs[ut].mu;
        }

        return res;
    };

    /*
     * define(symbol, base_unit, multiplier)
     *
     * Adds or modifies an entry in the equivalence table.
     *
     */
    var define = lib.define = function(symbol, base_unit, multiplier){
        if(isNaN(multiplier - multiplier)){
            throw new Error('define(symbol, base_unit, multiplier): ' +
                            'multiplier is not numeric.');
        }
        eqs[symbol] = {base: base_unit, mu: multiplier};
        eqs['_' + symbol] = { base : '_' + base_unit, 'mu' : 1.0 / multiplier };
    }

    // adding the library to the global namespace under 'units'.
    root.units = lib;
}(this));
