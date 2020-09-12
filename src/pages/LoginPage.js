import React from 'react';
import { StyleSheet, ScrollView, TextInput, Button, View, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            senha: ""
        }
    }
    access() {
        this.setState({ isLoading: false });
        this.props.navigation.replace('Pessoas');
    }

    getMsgByErrorCode(errorCode) {
        console.log(errorCode);
        switch (errorCode) {
            case "auth/wrong-password":
                return "Senha incorreta";
            case "auth/invalid-email":
                return "E-mail inválido";
            case "auth-user-not-found":
                return "usuário não encontrado";
            case "auth/user-disabled":
                return "Usuáro desativado";
            case "auth/email-already-in-use":
                return "Usuário já está em uso.";
            case "auth/operation-not-allowed":
                return "Operação não permitida";
            case "auth/weak-password":
                return "Senha fraca.";
            default:
                return `Erro $errorCode desconhecido`;

        }
    }

    login() {
        this.setState({
            isLoading: true,
            message: '',
            isLoading: false,
            message: ''
        });
        const { email, senha } = this.state;

        return firebase
            .auth()
            .signInWithEmailAndPassword(email, senha)
            .then(
                user => {
                    this.access()
                }
            )
            .catch(
                error => {
                    this.setState({
                        message: this.getMsgByErrorCode(error.code),
                        isLoading: false
                    });
                }
            )
    }

    register() {
        const { email, senha } = this.state;

        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(user => {
                this.access();
            })
            .catch(error => {
                this.setState(
                    { 
                        message: this.getMsgByErrorCode(error.code), 
                        isLoading: false 
                    });
            });
    }

    getRegister() {
        const { email, senha } = this.state;
        if (!email || !senha) {
            Alert.alert(
                "Cadastro",
                "Para se cadastrar informe e-mail e senha"
            );
            return null;
        }
        Alert.alert(
            "Cadastro",
            "Deseja cadastrar seu usuário com os dados informados?",
            [{
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Cadastrar",
                onPress: () => { this.register() }

            }],
        );
    }

    onChangeHandler(field, value) {
        this.setState({ [field]: value })
    }

    componentDidMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyB68rnvltR2YSEdwY_bkdyelSXk70FFv6M",
            authDomain: "notestimeline-benevenuti.firebaseapp.com",
            databaseURL: "https://notestimeline-benevenuti.firebaseio.com",
            projectId: "notestimeline-benevenuti",
            storageBucket: "notestimeline-benevenuti.appspot.com",
            messagingSenderId: "629243823194",
            appId: "1:629243823194:web:9b698c87c755ac91a4c463",
            measurementId: "G-NFXQS4Y75X"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator size='large' style={styles.loading}> </ActivityIndicator>

        return (
            <View>
                <View style={styles.btn}>
                    <Button
                        title="ENTRAR"
                        color="#6542f4"
                        onPress={() => this.login()}
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        title="CADASTRAR"
                        color="#a08af7"
                        onPress={() => this.getRegister()}
                    />
                </View>
            </View>
        )
    }

    renderMessage() {
        const { message } = this.state;
        if (!message)
            return null;
        Alert.alert(
            "Erro",
            message.toString(),
            [{
                text: 'OK',
                onPress: () => { this.setState({ message: '' }); }

            }]
        )
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <View style={styles.logoView}>
                        <Image
                            source={require('../img/logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="user@example.com"
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(value) => this.onChangeHandler('email', value)}
                        />
                    </FormRow>
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            secureTextEntry
                            value={this.state.senha}
                            onChangeText={(value) => this.onChangeHandler('senha', value)}
                        />
                    </FormRow>
                    {this.renderButton()}
                    {this.renderMessage()}
                </ScrollView>
            </KeyboardAvoidingView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#dbd5d5",
    },
    input: {
        paddingRight: 5,
        paddingLeft: 5
    },
    btn: {
        paddingTop: 20,
        fontSize: 11
    },
    logo: {
        aspectRatio: 1,
        resizeMode: 'center',
        width: 400,
        height: 400,
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        padding: 20
    }
});