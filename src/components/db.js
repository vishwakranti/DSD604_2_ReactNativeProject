import {  View, Text, StyleSheet,  Pressable,} from "react-native";
import * as Sqlite from "expo-sqlite";
import { useEffect, useState } from "react";
import { DataTable } from 'react-native-paper';

const DbCities = () => {
  const sqliteDb = Sqlite.openDatabase('Quiz.db');
  const [dbCities, setDbCities] = useState([]);

  const getCities = () => {
    sqliteDb.transaction(function (txn) {
      txn.executeSql(
        "create table if not exists cities (id integer primary key autoincrement, city text)",
      );
    });
    sqliteDb.transaction(function (txn) {
      txn.executeSql(
        "select * from cities",
        null,
        function (txObj, resultSet) { setDbCities(resultSet.rows._array) },
      ),
        function (txObj, error) { console.error(error) };
    });
  };

  useEffect(() => {
    sqliteDb.transaction(function (txn) {
      txn.executeSql(
        "create table if not exists cities (id integer primary key autoincrement, city text)",
      );
    });
    sqliteDb.transaction(function (txn) {
      txn.executeSql(
        "select * from cities",
        null,
        function (txObj, resultSet) { setDbCities(resultSet.rows._array) },
      ),
        function (txObj, error) { console.error(error)} ;
    });
  }, []);


  const deleteCities = () => {
    sqliteDb.transaction(function (txn) {
      txn.executeSql(
        "delete from cities ",
        setDbCities([]),
        function (txObj, error) { console.log(error)}
      );
    });
  };

  const deleteCity = (id) => {
    sqliteDb.transaction(function (txn) {
      txn.executeSql(
        "delete from cities WHERE id=?",
        [id],
        function (txObj, resultSet)  {
          if (resultSet.rowsAffected > 0) {
            let existingCities = [...dbCities].filter((city) => city.id !== id);
            setDbCities(existingCities);
          }
        },
        function (txObj, error) { console.log(error) }
      );
    });
  };

  const showCities = () => {
    return dbCities.map((city, index) => {
      return (
        <DataTable.Row>
          <DataTable.Cell>{city.city}</DataTable.Cell>
          <DataTable.Cell><Pressable
            onPress={() => deleteCity(city.id)}
            style={styles.deleteCity}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Delete</Text>
          </Pressable></DataTable.Cell>
        </DataTable.Row>
      );
    });
  };
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Row>
        <DataTable.Cell><Pressable onPress={getCities} style={styles.getCities}>
              <Text style={{ color: "#000000", fontSize: 14 }}>Refresh Cities</Text>
            </Pressable></DataTable.Cell>
          <DataTable.Cell><Pressable onPress={deleteCities} style={styles.deleteCities}>
              <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Delete Cities</Text>
            </Pressable></DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <DataTable>{showCities()}</DataTable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4169E1",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    margin: 2,
    alignSelf: "center",
    alignItems: "center",
  },
  cities: {
    color: "#000000",
    padding: 3,
    margin: 3,
    textAlign: "left",
  },
  getCities: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#219EBC",
    margin: 12,
    width: 120,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#000000",
    borderRadius: 10,
  },
  deleteCities: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF0000",
    margin: 12,
    width: 120,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#FFFFFF",
    borderRadius: 10,

  },
  deleteCity: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FF0000",
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#fff",
    borderRadius: 10,
    width: 100,
  },

});

export default DbCities;
