// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.24;

contract Counter {
    int256 public value;

    constructor(int256 _value) {
        value = _value;
    }

    function increase() public {
        value += 1;
    }

    function decrease() public {
        value -= 1;
    }
}
