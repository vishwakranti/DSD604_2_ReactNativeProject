import React, { useState, useEffect, useRef } from "react";
import QuestionLabel from './questionLabel';
import Footer from './footer';
import Results from './results';
import SelectDropdown from "react-native-select-dropdown";
import { quizData } from '../../assets/cities';
import { View, Text, StyleSheet, Pressable, Modal, Alert, FlatList } from "react-native"
const Quiz = () => {
    const [quizDataSet, setQuizDataSet] = useState({
        Country: "",
        Capital: ""
    });

    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");
    const [selectedCapital, setSelectedCapital] = useState("");
    const [correctGuess, setCorrectGuess] = useState([]);
    const [incorrectGuess, setIncorrectGuess] = useState([]);
    //const [questionLabel, setQuestionLabel] = useState();
    const sortedQuizData = [...quizData].sort();
    const capitalCityData = sortedQuizData.map((obj) => obj.Capital);
    const sortedCapitalCitiesData = [...capitalCityData].sort();
    let UserGuess;

    const handleGameStart = () => {
        LoadSelectListData();
        let randomNum = Math.floor(Math.random() * (quizData.length - 0 + 1)) + 0;
        let randomQuizData = quizData[randomNum];
        setQuizDataSet({ Country: randomQuizData.Country, Capital: randomQuizData.Capital });
        setCountry(randomQuizData.Country);
        setCapital(randomQuizData.Capital);
        //setQuestionLabel({ Country: quizData[randomNum].Country, Hint: quizData[randomNum].Country});
    }
    const handleSelectValueChange = (item, idx) => {
        console.log('select value changed to: ', item);
        UserGuess = item;
        setSelectedCapital(item);

        let result = IsUserGuessCorrect({ guess: item, data: capital });
        //console.log('User guess is ', result);
        if (result) {
            //QuizAlert({ text: "Right Answer!", icon: "success", btnText: "Play again!" });
            setCorrectGuess((correctGuess) => [
                ...correctGuess,
                item
            ]);
        }
        else {
            //QuizAlert({ text: "Wrong Answer. Try again!", icon: "error", btnText: "Try again!" });
            setIncorrectGuess((incorrectGuess) => [
                ...incorrectGuess,
                item
            ]);
        }
    };

    const LoadSelectListData = () => {
        const selectList = quizData.map((item) => ({ value: item.Capital, label: item.Capital }));
        const selectListSorted = [...selectList].sort((a, b) => (a.value > b.value ? 1 : -1));
        //setSelectValue(selectListSorted);

    };

    const IsUserGuessCorrect = ({ guess, data }) => {
        console.log('Correct Answer: ', data);
        if (guess != null && guess === data) { return true; }
        else { return false; }
    };

    const QuizAlert = ({ text, icon, btnText }) => {
        // Swal({
        //     title: "Quiz Result",
        //     text: text,
        //     icon: icon,
        //     button: btnText,
        // });
    }

    useEffect(() => {
        //GetSelectListData();
    }, []);

    return (
        <View style={quizStyles.container}>
            <View style={quizStyles.questionLabel}>
                <Pressable onPress={handleGameStart} style={quizStyles.questionBtn}>
                    <Text>Select a Random Country</Text>
                </Pressable>
                <View style={quizStyles.country}>
                    <Text style={{ fontSize: 25, color: "#ffff" }}>{country}</Text>
                </View>
            </View>
            {country && (
                <View style={quizStyles.container}>
                    <View>
                        <Text style={{ fontSize: 16, color: "#ffff", textAlign: "center" }}>Select a capital city</Text>
                    </View>
                    <View style={quizStyles.dropdown}>
                        <SelectDropdown data={sortedCapitalCitiesData} onSelect={handleSelectValueChange} />
                    </View>
                </View>
            )}
            {country && (
                <View style={quizStyles.guessContainer}>
                    <View>
                        <View style={quizStyles.correctGuessContainer}>
                            <Text style={{ fontSize: 14, color: "#000000", fontWeight: 'bold' }}>Correct Guess</Text>
                            <FlatList data={correctGuess}
                                        renderItem={({item}) => <Text style={{ fontSize: 14, color: "#0000FF" }}>{item}</Text>}
                             />
                        </View>
                    </View>
                    <View>
                        <View style={quizStyles.incorrectGuessContainer}>
                            <Text style={{ fontSize: 14, color: "#000000", fontWeight: 'bold' }}>Incorrect Guess</Text>
                            <FlatList data={incorrectGuess}
                                        renderItem={({item}) => <Text style={{ fontSize: 14, color: "#B22222" }}>{item}</Text>}
                             />
                        </View>
                    </View>
                </View>
            )}
        </View>

    );
};


const quizStyles = StyleSheet.create({
    container: {
        backgroundColor: "#4169E1",
        flex: 1,
        justifContent: "center",
        alignItems: "center"
    },
    questionLabel: {
        alignItems: "center",
        flex: 5,
        justifyContent: "center"
    },
    questionBtn: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 5,
        width: 275,
        padding: 10,
        backgroundColor: "#FFFFFF",
    },
    country: {
        flex: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    guessContainer:{
        flexDirection: "row",
        margin: 8,
        flex: 5,
        width: 250
    },
    correctGuessContainer:{
        margin: 18,
        flex: 1
    },
    incorrectGuessContainer: {
        margin: 18,
        flex: 1
    }
});
export default Quiz;