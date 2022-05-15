import Web3 from "web3";
import { useState } from "react";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8547");

const Home = () => {
  const [account, setAccount] = useState();

  const handleCreateAccount = () => {
    const _account = web3.eth.accounts.create();
    setAccount(_account);
    console.log(_account);
  };

  const handleSignTx = async () => {
    const nonce = await web3.eth.getTransactionCount(account.address, "latest");
    //TX
    const transaction = {
      to: "0x5eBEE421a3665B08E8d0f985bCe7566BeadC0978",
      value: 1 * 10 ** 18,
      gas: 30000,
      nonce: nonce,
    };

    //Sign TX
    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      account.privateKey
    );

    //Send tx
    await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
      function (error, hash) {
        if (!error) {
          console.log("🎉 The hash of your transaction is: ", hash);
        } else {
          console.log(
            "❗Something went wrong while submitting your transaction:",
            error
          );
        }
      }
    );
  };

  return (
    <>
      <h1>Mimic Wallet</h1>
      <button onClick={handleCreateAccount}>create account</button>
      <br />
      <br />

      {account && (
        <>
          <h1>Your Account</h1>
          Address: {account.address} <br />
          Private key: {account.privateKey}
          <br />
          <button onClick={handleSignTx}>Sign Transaction</button>
        </>
      )}
    </>
  );
};

export default Home;
