import { quizData } from '../../assets/cities';
import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { DataTable } from 'react-native-paper';

const WeatherApi = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [city, setCity] = useState("");
    const [capitalCities, setCapitalCities] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const LoadSelectListData = () => {
        const capitalSelectList = quizData.map((item) => (item.Capital));
        const capitalSelectListSorted = [...capitalSelectList].sort();
        setCapitalCities(capitalSelectListSorted);
    };
    useEffect(() => {
        LoadSelectListData();
    }, []);

    useEffect(() => {
        getCityWeatherData();
    }, [city]);

    const handleSelectValueChange = (item, idx) => {
        setCity(item);
    }

    const getCityWeatherData = async () => {

        try {
            let apiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=226f8607b63391f4f84c19e84bc76874&q=${city}`);
            if (apiResponse.ok) {
                const apiData = await apiResponse.json();
                setWeatherData({
                    wind: apiData.wind.speed,
                    humidity: apiData.main.humidity,
                    weather: apiData.weather[0].description,
                    temp: apiData.main.temp
                });
            }
            else {
                throw new Error("Please select the city again!");
            }
        } catch (error) {
            console.log("open weather api error - ", error)
        }
        setLoading(false);
    };

    return (

        <View style={weatherStyles.container}>
            <View style={weatherStyles.selectListContainer}>
                <View>
                    <View>
                        <Text style={{ textAlign: "center", fontSize: 16, color: "#FFFFF" }}>Select a City</Text>
                    </View>
                    <View style={weatherStyles.selectDropDown}>
                        <SelectDropdown data={capitalCities} onSelect={handleSelectValueChange} />
                    </View>
                </View>
            </View>

            <View style={weatherStyles.weatherContainer}>
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <View>

                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>
                                    The current weather of {city}
                                </DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>Weather is {weatherData.weather}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Temperature is {weatherData.temp}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>Wind Speed is {weatherData.wind}</DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell>The humidity is {weatherData.humidity}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </View>
                )}
            </View>
        </View>
    );

};


const weatherStyles = StyleSheet.create({
    container: {
        backgroundColor: "#4169E1",
        flex: 1,
    },
    selectListContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    weatherContainer: {
        flex: 3,
        padding: 24,
    },
    selectDropDown: {
        margin: 10,
    },
});

export default WeatherApi;