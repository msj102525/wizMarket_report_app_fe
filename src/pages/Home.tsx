import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axiosAdmin from '../api/axiosAdmin';

const Home: React.FC = () => {
    const [storeName, setStoreName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosAdmin.post('/loc/store/select/store/list', {
                city: null,
                district: null,
                subDistrict: null,
                storeName,
                matchType: 'LIKE',
                mainCategory: 'I2',
                subCategory: 'I204',
                detailCategory: 'I20403',
                page: 1,
                page_size: 20,
            });
            setData(response.data.filtered_data);
        } catch (err: any) {
            setError('Error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData(); // 데이터 요청
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.storeName}>{item.store_name}</Text>
            <Text>{item.road_name_address}</Text>
            <Text>{item.city_name} {item.district_name} {item.sub_district_name}</Text>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setStoreName}
                        value={storeName}
                        placeholder="매장명"
                        keyboardType="default"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
                        <Text style={styles.buttonText}>
                            {loading ? '검색 중...' : '매장검색'}
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007BFF" />
                    </View>
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.store_business_number}
                    />
                ) : (
                    <Text style={styles.success}>데이터를 성공적으로 가져왔습니다.</Text>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 4,
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 16,
    },
    success: {
        color: 'green',
        marginTop: 16,
    },
    itemContainer: {
        marginVertical: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    storeName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200, // 적절한 높이를 설정하세요
    },
});

export default Home;
