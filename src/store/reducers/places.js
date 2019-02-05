import { ADD_PLACE,DELETE_PLACE,SELECT_PLACE,DESELECT_PLACE } from "../actions/actionTypes";

const initialState = {
    places: [],
    selectedPlace: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                      uri: "https://www.costarica.com/contentAsset/image/f989844e-960c-4cca-b9c2-87638dc2d18c/fileAsset/filter/Resize,Jpeg/resize_w/1000/Jpeg_q/x.8.pagespeed.ic.aU8XGzsoQJ.jpg"
                    }
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((place) =>{
                    return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            }
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place =>{
                    return place.key === action.placeKey;
                })
            }
        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace = null
            }

        default: state;
    }
}

export default reducer;