import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { NativeBaseProvider, FlatList, ScrollView, Divider, Image, useColorModeValue, Spinner, HStack, Heading } from 'native-base';
import { services } from '../services/services';
import moment from 'moment';
import { style } from 'styled-system';
import {data} from "./data";
import {Picker} from '@react-native-picker/picker';

export default function Sports() {
    
    const [newsData, setNewData] = useState([]);
    const [country, setCountry] = useState("us");


    useEffect(() => {
       services('sports', String(country))
       .then(data => {
           setNewData(data)
       })
       .catch(err => {
           alert(err)
       })
    }, [country]);
    
    return (
        <NativeBaseProvider>
            <Picker 
              style={styles.picker}
              selectedValue={country}
              onValueChange={(value) => setCountry(value)}
            >
                {data.map((datas) => (
                  <Picker.Item label={datas.name} value={datas.value} key={datas.name}/>
                ))}
            </Picker>
            <SafeAreaView style={{flex: 1}}>
               {newsData.length > 1 ? (
                  <FlatList 
                    data={newsData}
                    key={Math.random() * 100000}
                    renderItem={({item})=> (
                        <View key={(Math.random() * 100000)}>
                                <View style={styles.newsContainer} key={(Math.random() * 100000)}>
                                    <Image
                                        width={550}
                                        height={250}
                                        resizeMode={"cover"}
                                        key={(Math.random() * 100000)}
                                        source={{
                                            uri: item.urlToImage
                                                ? item.urlToImage
                                                : "https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6khvKFrxJOmRzNwXs1M3EMoAJtliMshfVq9fk8",
                                        }}
                                        alt="Image"
                                    />
                                    <Text style={styles.title} key={(Math.random() * 100000)}>{item.title}</Text>
                                    <Text style={styles.date} key={(Math.random() * 100000)}>
                                        {moment(item.publishedAt).format("LLL")}
                                    </Text>
                                    <Text style={styles.newsDescription} key={new Date().getMilliseconds()}>{item.description}</Text>
                                </View>
                                <Divider my={2} size={4} bg="#e0e0e0" />
                            </View>
                    )}
                    keyExtractor={(item) => item.id}
                  />
               ) : (
                   <View style={styles.spinner}>
                        <HStack>
                            <Heading color={useColorModeValue("gray.900", "gray.100")}>News Daily</Heading>
                            <Spinner style={style.spin} color="blue.500" size="lg"/>
                        </HStack>
                   </View>
               )}
            </SafeAreaView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    picker:{
        height: "7%"
    }, 
    newsContainer: {
        padding: 10
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: "600"
    },
    newsDescription: {
        fontSize: 16,
        marginTop: 10
    },
    date: {
        fontSize: 14
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 600
    },
    spin:{
       paddingTop:7,
       paddingLeft:5
    }
});