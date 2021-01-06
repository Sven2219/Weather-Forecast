export const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(188,159,10,${opacity})`,
    labelColor: (opacity = 1) => `rgba(135, 135, 135, ${opacity})`,
    decimalPlaces: 1,
    strokeWidth: 3, 
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
};