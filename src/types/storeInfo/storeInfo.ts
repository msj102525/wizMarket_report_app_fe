interface FetchStoreInfoError {
    message: string;
    status: number;
}

export interface StoreInfoState {
    city_name: string;
    district_name: string;
    sub_district_name: string;
    detail_category_name: string;
    biz_detail_category_rep_name: string | null;
    loc_info_data_ref_date: string | null;
    nice_biz_map_data_ref_date: string | null;
    population_data_ref_date: string | null;
    biz_main_category_id: number | null;
    loading?: boolean;
    error?: FetchStoreInfoError | string;
}
