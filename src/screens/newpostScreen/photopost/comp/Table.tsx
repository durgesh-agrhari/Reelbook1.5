import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

type TableRow = {
  id: string;
  status: string;
  equipment: string;
  serialNumber?: string;
  location?: string;
};

const tableData: TableRow[] = [
  { id: "1", status: "OPEN", equipment: "2800 BASE UNIT W/ VUCAPTURE", serialNumber: "RL0010F3511FC9", location: "OR 5" },
  { id: "2", status: "OPEN", equipment: "2800 BASE UNIT W/ VUCAPTURE", serialNumber: "RL0023A12345B6", location: "OR 7" },
];

const Table: React.FC = () => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {/* Table Header */}
        {/* <View style={styles.row}>
          <Text style={[styles.cell, styles.headerCell]}>STATUS</Text>
          <Text style={[styles.cell, styles.headerCell]}>EQUIPMENT</Text>
          <Text style={[styles.cell, styles.headerCell]}>S/N</Text>
          <Text style={[styles.cell, styles.headerCell]}>LOCATION</Text>
        </View> */}

        {/* Table Rows */}
        {tableData.map((row) => (
          <View style={styles.row} key={row.id}>
            <Text style={styles.cell}>{row.status}</Text>
            <Text style={styles.cell}>{row.equipment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#000", // Dark border for Excel-like appearance
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000", // Dark horizontal borders
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#000", // Dark vertical borders
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#f0f0f0", // Light gray for the header like in Excel
  },
});

export default Table;
