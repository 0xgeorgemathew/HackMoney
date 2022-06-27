// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Vault  Contract for storing tokens and issuing shares
contract KenobiVault {
    IERC20 public immutable token;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function _mint(address _to, uint256 _shares) private {
        // Function to mint shares
        totalSupply += _shares;
        balanceOf[_to] += _shares;
    }

    function _burn(address _from, uint256 _shares) private {
        // Function to burn shares
        totalSupply -= _shares;
        balanceOf[_from] -= _shares;
    }

    function deposit(uint256 _amount) external {
        // Function to deposit tokens ot Vault
        // a = amount
        // T = totalSupply
        // B = balance of Tokens before deposit
        // s = Shares to be minted
        // S = a*T/B

        uint256 shares;

        if (totalSupply == 0) {
            shares = _amount;
        } else {
            shares = (_amount * totalSupply) / token.balanceOf(address(this));
        }
        _mint(msg.sender, shares);
        token.transferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint256 _shares) external {
        // Function to deposit tokens ot Vault
        // a = amount
        // T = totalSupply
        // B = balance of Tokens before withdraw
        // s = Shares to be bruned
        // a = S*B/T
        uint256 amount = (_shares * token.balanceOf(address(this))) /
            totalSupply;
        _burn(msg.sender, _shares);
        token.transfer(msg.sender, amount);
    }
}
