import React, { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginPageProps = {
  navigation: StackNavigationProp<any>;
};

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, user } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      navigation.navigate("MainApp");
      console.log({ user });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Handle successful Google login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Login with Google" onPress={handleGoogleLogin} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default LoginPage;
