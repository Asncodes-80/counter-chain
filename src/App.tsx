import { ethers } from "ethers";
import React from "react";

import "./App.css";
import CounterAbi from "../artifacts/contracts/Counter.sol/Counter.json";

function App() {
  const deployedContractAddress: string =
    "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const windowEth = (window as any).ethereum;
  const [account, setAccount] = React.useState<string>("");
  const [provider, setProvider] =
    React.useState<ethers.providers.Web3Provider>();
  const [counter, setCounter] = React.useState<ethers.Contract>();

  const [countValue, setCountValue] = React.useState<string>("");

  const connectToWallet = async () => {
    const accounts = await windowEth.request({
      method: "eth_requestAccounts",
    });
    setAccount(ethers.utils.getAddress(accounts[0]));
  };

  const getCounterValue = async () => {
    try {
      const provider: ethers.providers.Web3Provider =
        new ethers.providers.Web3Provider(windowEth);
      setProvider(provider);

      const counter: ethers.Contract = new ethers.Contract(
        deployedContractAddress,
        CounterAbi.abi,
        provider
      );
      setCounter(counter);
      const value = await counter.value();
      setCountValue(String(value));
    } catch (error) {
      console.log(error);
    }
  };

  const increase = async () => {
    try {
      const signer = provider?.getSigner();
      const transaction = await counter?.connect(signer!).increase();
      await transaction.wait();
      getCounterValue();
    } catch (err) {
      console.log(err);
    }
  };

  const decrease = async () => {
    try {
      const signer = provider?.getSigner();
      const transaction = await counter?.connect(signer!).decrease();
      await transaction.wait();
      getCounterValue();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getCounterValue();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1>Count: {countValue}</h1>
        <p>Account: {account}</p>
        <div>
          <button
            style={{
              marginInline: "5px",
            }}
            onClick={() => connectToWallet()}
          >
            Connect to wallet
          </button>
          <button
            style={{
              backgroundColor: "green",
              marginInline: "10px",
            }}
            onClick={() => increase()}
          >
            +
          </button>
          <button style={{ backgroundColor: "red" }} onClick={() => decrease()}>
            -
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
