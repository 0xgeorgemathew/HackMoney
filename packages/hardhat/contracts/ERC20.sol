// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KenobiToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("KenobiToken", "KNB") {
        _mint(msg.sender, 1000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
// contract KenobiToken is IERC20 {
//     uint256 public totalSupply;
//     mapping(address => uint256) public balanceOf;
//     mapping(address => mapping(address => uint256)) public allowance;
//     string public name = "Kenobi Token 1";
//     string public symbol = "KNB";
//     uint8 public decimals = 18;

//     function transfer(address recipient, uint256 amount)
//         external
//         returns (bool)
//     {
//         balanceOf[msg.sender] -= amount;
//         balanceOf[recipient] += amount;
//         emit Transfer(msg.sender, recipient, amount);
//         return true;
//     }

//     function approve(address spender, uint256 amount) external returns (bool) {
//         allowance[msg.sender][spender] = amount;
//         emit Approval(msg.sender, spender, amount);
//         return true;
//     }

//     function transferFrom(
//         address sender,
//         address recipient,
//         uint256 amount
//     ) external returns (bool) {
//         allowance[sender][msg.sender] -= amount;
//         balanceOf[sender] -= amount;
//         balanceOf[recipient] += amount;
//         emit Transfer(sender, recipient, amount);
//         return true;
//     }

//     function mint(uint256 amount) external {
//         balanceOf[msg.sender] += amount;
//         totalSupply += amount;
//         emit Transfer(address(0), msg.sender, amount);
//     }

//     function burn(uint256 amount) external {
//         balanceOf[msg.sender] -= amount;
//         totalSupply -= amount;
//         emit Transfer(msg.sender, address(0), amount);
//     }
// }
