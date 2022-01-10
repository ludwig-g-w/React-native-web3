import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { ethers } from "ethers";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Hello__factory, TodoList__factory } from "../types";

const AMBER_URL = "https://moeing.tech:9545/";
const TODO_SMARTBCH = "0x00c68e49c2C2Bc55D7dADb43dcC633A7a8c6a402";
const CONTRACT_ADDRESS = "0xcCCe11aEd176C64c3B68C0e12Eb3A0aE975198B5";
const MUMBAI =
  "https://polygon-mumbai.g.alchemy.com/v2/I6_CU10SsmTGqIRlBfM7zO50wgrLgh8z";

function App(): JSX.Element {
  const connector = useWalletConnect();
  const [message, setMessage] = React.useState<string>("Loading...");

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);
  const provider = useMemo(
    () => new ethers.providers.JsonRpcProvider(MUMBAI),
    []
  );
  const contract = useMemo(
    () => new Hello__factory().attach(CONTRACT_ADDRESS).connect(provider),
    [provider]
  );

  const signTransaction = async () => {
    try {
      const [account] = connector.accounts;

      const nonce = await provider.getTransactionCount(account);
      const signed = await contract.populateTransaction["setHello"](
        { age: 10, name: "hej" },
        {
          nonce,
          from: account,
        }
      );

      console.log({ signed });

      const signedResponse = await connector.signTransaction({
        ...signed,
        gasLimit: 1500000,
        gasLimit: 1000000,
      });
      console.log({ signedResponse });
      // const response = await connector.sendTransaction(signedResponse);

      // const res = await connector.sendTransaction(signed);
      // console.log({ response });
    } catch (e) {
      console.error(e);
    }
  };

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.center, styles.white]}>
      <Text testID="tid-message">{message}</Text>
      {!connector.connected && (
        <Pressable style={styles.button} onPress={connectWallet}>
          <Text>Connect a Wallet</Text>
        </Pressable>
      )}
      {!!connector.connected && (
        <>
          <Pressable style={styles.button} onPress={signTransaction}>
            <Text>Sign a Transaction</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={killSession}>
            <Text>Kill Session</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  button: {
    height: 65,
    width: 200,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  center: { alignItems: "center", justifyContent: "center" },
  white: { backgroundColor: "white" },
});
