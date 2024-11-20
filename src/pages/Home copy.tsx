import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import UserProfile from '../components/profile/UserProfile';
import axiosReport from '../api/axiosReport';
import { COLORS } from '../constants/colors';
import { STORENUMBER } from '../constants/storeNumber';
import { StoreInfoState } from 'types/storeInfo/storeInfo';
import { RootState, AppDispatch } from '../store';
import { fetchStoreInfo } from '../slice/storeInfoSlice';
import { useSelector, useDispatch } from 'react-redux';

const Home: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<StoreInfoState | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const storeInfo = useSelector((state: RootState) => state.storeInfo);
    const store_business_id = STORENUMBER.JS0003;

    const user = {
        name: "JS003",
        avatar: "인더키친 몽뜨레셰프 광주"
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosReport.get('/report/store/info/redux', {
                    params: { store_business_id },
                });
                setData(response.data);
            } catch (err: any) {
                setError('Error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [store_business_id]);

    useEffect(() => {
        dispatch(fetchStoreInfo(store_business_id));
    }, [dispatch, store_business_id]);

    const renderStoreData = () => {
        if (!data) return null;

        return (
            <View style={styles.dataSection}>
                <Text style={styles.sectionTitle}>Store Data:</Text>
                {Object.entries(data).map(([key, value]) => (
                    <Text key={key} style={styles.dataText}>
                        {key}: {String(value)}
                    </Text>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <UserProfile name={user.name} avatar={user.avatar} />

            {loading && <Text style={styles.statusText}>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {renderStoreData()}

            <View style={styles.divider} />

            <View style={styles.storeInfoSection}>
                {storeInfo.loading && <Text style={styles.statusText}>Loading...</Text>}
                {storeInfo.error && (
                    <Text style={styles.errorText}>
                        Error: {typeof storeInfo.error === 'string'
                            ? storeInfo.error
                            : storeInfo.error?.message || 'Unknown error occurred'}
                    </Text>
                )}

                {!storeInfo.loading && !storeInfo.error && (
                    <>
                        <Text style={styles.sectionTitle}>StoreInfoRedux:</Text>
                        {storeInfo.city_name && (
                            <Text style={styles.infoText}>City: {storeInfo.city_name}</Text>
                        )}
                        {storeInfo.district_name && (
                            <Text style={styles.infoText}>District: {storeInfo.district_name}</Text>
                        )}
                        {storeInfo.sub_district_name && (
                            <Text style={styles.infoText}>Sub District: {storeInfo.sub_district_name}</Text>
                        )}
                        {storeInfo.detail_category_name && (
                            <Text style={styles.infoText}>Category: {storeInfo.detail_category_name}</Text>
                        )}
                        {storeInfo.biz_detail_category_rep_name && (
                            <Text style={styles.infoText}>Business Category: {storeInfo.biz_detail_category_rep_name}</Text>
                        )}
                        {storeInfo.loc_info_data_ref_date && (
                            <Text style={styles.infoText}>Location Info Date: {storeInfo.loc_info_data_ref_date}</Text>
                        )}
                        {storeInfo.nice_biz_map_data_ref_date && (
                            <Text style={styles.infoText}>Business Map Date: {storeInfo.nice_biz_map_data_ref_date}</Text>
                        )}
                        {storeInfo.population_data_ref_date && (
                            <Text style={styles.infoText}>Population Data Date: {storeInfo.population_data_ref_date}</Text>
                        )}
                        {storeInfo.biz_main_category_id !== null && (
                            <Text style={styles.infoText}>Main Category ID: {storeInfo.biz_main_category_id}</Text>
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    dataSection: {
        padding: 16,
    },
    storeInfoSection: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dataText: {
        fontSize: 14,
        marginBottom: 4,
    },
    infoText: {
        fontSize: 14,
        marginBottom: 4,
        padding: 4,
    },
    statusText: {
        padding: 16,
        fontSize: 16,
        textAlign: 'center',
    },
    errorText: {
        padding: 16,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 16,
    },
});

export default Home;