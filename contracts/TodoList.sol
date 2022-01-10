// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TodoList is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    constructor() {}

    struct TodoItem {
        uint256 todoId;
        string title;
        bool finished;
        address payable creator;
        // address payable[] accountables;
        // bytes32 deadline;
        uint256 amount;
    }

    mapping(uint256 => TodoItem) private idToTodo;

    /*  When time is up send the money a donation or accountable */
    event TodoExpired();

    event TodoCompleted();

    /* create a todo that has an array of accountableAdresses and a deadline to finish */
    function createTodo(string memory title)
        public
        payable
        nonReentrant
        returns (uint256)
    {
        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToTodo[itemId] = TodoItem(
            itemId,
            title,
            false,
            payable(msg.sender),
            msg.value
        );
        return itemId;
    }

    function fetchUnfinishedTodos() public view returns (TodoItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // get item count
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToTodo[i + 1].creator == msg.sender) {
                itemCount += 1;
            }
        }

        TodoItem[] memory items = new TodoItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            TodoItem memory item = idToTodo[i + 1];
            if (item.creator == msg.sender && item.finished == false) {
                uint256 currentId = idToTodo[i + 1].todoId;
                TodoItem storage currentItem = idToTodo[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function completeTodo(uint256 todoId) public payable nonReentrant {
        uint256 totalItemCount = _itemIds.current();

        for (uint256 i = 0; i < totalItemCount; i++) {
            TodoItem memory item = idToTodo[i + 1];
            if (item.todoId == todoId) {
                item.finished = true;
                payable(msg.sender).transfer(item.amount);
                delete item;
                break;
            }
        }
    }

    function askAccountablesToMarkComplete(uint256 todoId) public {}

    function accountableMarkComplete(uint256 todoId) public {}
}
