$(document).ready(function(){

    function near_enough(a, b, t){
        t = typeof(t) != 'undefined' ? t : 0.0001;
        ok(Math.abs(a - b) < t);
    }

    module('Basic functionality');

    test('Known inputs', function(){
        equal(units.convert(1, 'm', 'm'), 1);
        near_enough(units.convert(15, 'm', 'ft'), 49.21259);
        near_enough(units.convert(49.21259, 'ft', 'm'), 15);
    });

    test('Idempotency', function(){
        var sqm = units.convert(12.3, 'ft2', 'm2');
        equal(units.convert(sqm, 'm2', 'ft2'), 12.3);
    });

    test('Compound units', function(){
        near_enough(units.convert(15, 'm-m', 'ft-ft'),
                    units.convert(15, 'm2', 'ft2'));
    });

    test('Inverse units', function(){
        near_enough(units.convert(1, 'mxn-_m2-_year', 'usd-_ft2-_month'),
                    0.3048 * 0.3048 / (12 * 14.0));
    });

    test('Fiddling with the stablished equivalences', function(){
        equal(units.convert(10, 'usd', 'mxn'), 140);
        units.define('mxn', 'usd', 1 / 12);
        equal(units.convert(10, 'usd', 'mxn'), 120);

        units.define('rmb', 'usd', 0.1572);
        near_enough(units.convert(10, 'usd', 'rmb'), 63.6, 0.1);
    });

});
