/* TESTS FOR INDEX.js*/

// first, import function to test from index file
import testFunc from "../index";

it('expect testFunc(5) to equal 25', () => {
    expect(testFunc(5)).toEqual(25);
});

