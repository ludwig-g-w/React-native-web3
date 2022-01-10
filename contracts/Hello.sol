// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hello {
    using Counters for Counters.Counter;
    string defaultSuffix;
    Counters.Counter private counter;

    constructor(string memory _defaultSuffix) {
        defaultSuffix = _defaultSuffix;
    }

    struct HelloStruct {
        string name;
        uint8 age;
    }

    mapping(uint256 => HelloStruct) Hellos;

    function sayHello(string memory name) public view returns (string memory) {
        return string(abi.encodePacked("Welcome to ", name, defaultSuffix));
    }

    function changeSuffix(string memory suffix) public returns (string memory) {
        defaultSuffix = suffix;
        return defaultSuffix;
    }

    function setHello(HelloStruct memory hello)
        public
        returns (uint256, HelloStruct memory)
    {
        counter.increment();
        Hellos[counter.current()] = hello;

        return (counter.current(), hello);
    }

    function getHello(uint256 key) public view returns (HelloStruct memory) {
        return Hellos[key];
    }
}
