import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { quizData } from '../../assets/cities';
import { View, Text, StyleSheet, Pressable, Modal, FlatList } from "react-native"
import * as Sqlite from "expo-sqlite";

const Quiz = () => {
    const [country, setCountry] = useState("");
    const [capital, setCapital] = useState("");
    const [selectedCapital, setSelectedCapital] = useState("");
    const [correctGuess, setCorrectGuess] = useState([]);
    const [incorrectGuess, setIncorrectGuess] = useState([]);
    const [capitalCities, setCapitalCities] = useState([]);
    const [modalVisible, setModalVisible] = useState({showModal: false, displayText: ""});
    let UserGuess;

    //database
    var db = Sqlite.openDatabase('Quiz.db');
    const [dbCities, setDbCities] = useState([]);

    const handleGameStart = () => {
        LoadSelectListData();
        let randomNum = Math.floor(Math.random() * (quizData.length - 0 + 1)) + 0;
        let randomQuizData = quizData[randomNum];
        setCountry(randomQuizData.Country);
        setCapital(randomQuizData.Capital);
    }
    const handleSelectValueChange = (item, idx) => {
        //console.log('select value changed to: ', item);
        UserGuess = item;
        setSelectedCapital(item);
        let result = IsUserGuessCorrect({ guess: item, data: capital });
        if (result) {
            //console.log("Correct guess!");
            setModalVisible({showModal: true, displayText: "Correct guess"});
            setCorrectGuess((correctGuess) => [
                ...correctGuess,
                item
            ]);
        }
        else {
            //console.log("incorrect guess!");
            setModalVisible({showModal: true, displayText: item + " is not the capital of "+ country + ". Incorrect guess"});
            setIncorrectGuess((incorrectGuess) => [
                ...incorrectGuess,
                item
            ]);
        }
    };

    const LoadSelectListData = () => {
        const capitalSelectList = quizData.map((item) => (item.Capital));
        const capitalSelectListSorted = [...capitalSelectList].sort();
        setCapitalCities(capitalSelectListSorted);
    };

    const IsUserGuessCorrect = ({ guess, data }) => {
        console.log('Correct Answer: ', data);
        if (guess != null && guess === data) { return true; }
        else { return false; }
    };

    useEffect(() => {
        db.transaction(function (txn) {
            if(selectedCapital){
                txn.executeSql(
                    "insert into cities (city) values (?)",
                    [selectedCapital],
                    function (tx, res) {
                        console.log('item:', res.rows.length);
                        var tmpCities = [...dbCities];
                        tmpCities.push({id: res.insertId, city: selectedCapital});
                        setDbCities(tmpCities);
                    },
                    (tx, error) => console.log("db error", error)
                );
            }
            else{
                console.log("No city found to add to database!");
            }
          });

    }, [incorrectGuess]);

    return (
        <View style={quizStyles.container}>
            <View style={quizStyles.questionLabel}>
                <Pressable onPress={handleGameStart} style={quizStyles.questionBtn}>
                    <Text>Select a Random Country</Text>
                </Pressable>
                {country && (<View style={quizStyles.country}>
                    <Text style={{ fontSize: 22, color: "#ffff" }}>What is the capital of {country}?</Text>
                </View>)}
            </View>
            <View style={modalStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.showModal}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible({showModal:!modalVisible.showModal, displayText: ""});
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>{modalVisible.displayText}</Text>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible({showModal:!modalVisible.showModal, displayText: ""})}>
              <Text style={modalStyles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
            {country && (
                <View style={quizStyles.container}>
                    <View>
                        <Text style={{ fontSize: 16, color: "#ffff", textAlign: "center" }}>Select a capital city</Text>
                    </View>
                    <View style={quizStyles.dropdown}>
                        <SelectDropdown data={capitalCities} onSelect={handleSelectValueChange} />
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
        flex: 4,
        justifyContent: "center",
        borderRadius: 8,
        marginTop: 5,
        width: 275,
        padding: 10,
        backgroundColor: "#FFFFFF",
        height: 200
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
    },
    

});

const modalStyles = StyleSheet.create({centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Quiz;