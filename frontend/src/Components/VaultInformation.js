import React, { useEffect, useState } from 'react';
import {ethers} from "ethers";
import '../styles/App.css';
import VAULT from "../utils/Vault.json";

const contractAddress = "0xF3FEA28366aB5D98Fb2694b21f127E9a615Fb13E";
const DECIMALS = 10**18

const VaultInformation = () => {
    const [vaultFunds, setVaultFunds] = useState("");
    const [userFunds, setUserFunds] = useState("");
    const [rewards, setRewards] = useState("");

    const vaultBalance = async () => {
        const {ethereum} = window;
        try{
          if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract
            (
              contractAddress, 
              VAULT.abi, 
              signer
            );
              
            // vault balance
            var balance = await contract.vaultBalance();
            var vaultFunds = balance.toString() / DECIMALS; 
            setVaultFunds(vaultFunds)
            
            // user $ANTEI funds
            var userBalance = await contract.userBalance();
            var userFunds = userBalance.toString() / DECIMALS ; 
            setUserFunds(userFunds)

            // user rewards
            var currentBlock = await provider.getBlock();
                console.log(`CURRENT BLOCK: ${currentBlock.timestamp}`)
            var userBlock = await contract.userTimestamp();
                console.log(`USER BLOCK: ${userBlock}`)
            if(userBlock == 0){
              console.log("NO REWARDS")
              setRewards("You dont have any rewards yet")
              return;
            }
            var accumulatedRewards = currentBlock.timestamp - userBlock;
            setRewards(accumulatedRewards.toString() + "WEI")
            console.log(`REWARDS ${accumulatedRewards}`)
          }
    
        } catch(e){
          console.log(e);
        }
    }


  // runs when page loads, update information every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => vaultBalance(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  // Render information
  return (
    <div className='vault-container'>
        <div className='vault-information-left'>
            <p>Total funds in Vault</p>
            <br/>
            <p>Your farm token amount</p>
            <p>Your Rewards</p>
        </div>

        <div className='vault-information-right'>
            <p> {vaultFunds} ETH</p>
            <br/>
            <p> {userFunds} $ANTEI</p>
            <p> {rewards}</p>
        </div>
    </div>
  )
}

export default VaultInformation